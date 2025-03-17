import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Usuario logueado correctamente.',
    example: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvb2Z0LnRlY2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDIxNjgyOTYsImV4cCI6MTc0MjI1NDY5Nn0.p0tNj6ZRdW7DPK3JD-Z6OJ_qbkOt7QWpvSqb0IkcTJI',
      user: {
        id: 3,
        username: 'admin',
        email: 'admin@sooft.tech',
        role: 'ADMIN',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
    example: {
      message: 'Credenciales inválidas',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
