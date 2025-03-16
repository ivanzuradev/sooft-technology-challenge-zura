import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@sooft.tech',
    password: 'hashedPassword',
    role: Role.USER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('Debería retornar el usuario con las credenciales válidas', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('testuser', 'password123');

      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      const { password, ...expectedResult } = mockUser;
      expect(result).toEqual(expectedResult);
    });

    it('Debería tirar UnauthorizedException cuando no encuentra al usuario', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

      await expect(
        service.validateUser('wronguser', 'password123'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Debería tirar UnauthorizedException cuando la contraseña sea incorrecta', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('testuser', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('Debería tirar un access token y la data del usuario', async () => {
      const { password, ...userData } = mockUser;

      const result = await service.login(userData);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
      });

      expect(result).toEqual({
        access_token: 'test-token',
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role,
        },
      });
    });
  });
});
