import { Injectable, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrincipalDbService } from '../../db-layer/services/principal-db.service';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private db: PrincipalDbService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    if (!createCompanyDto) {
      throw new BadRequestException();
    } else {
      if (
        !createCompanyDto.cuit ||
        !createCompanyDto.razonSocial ||
        !createCompanyDto.fechaAdhesion
      ) {
        throw new BadRequestException();
      } else {
        try {
          return await this.db.empresa.create({
            data: {
              cuit: createCompanyDto.cuit,
              razonSocial: createCompanyDto.razonSocial,
              fechaAdhesion: new Date(createCompanyDto.fechaAdhesion),
            },
          });
        } catch (error) {
          console.log(error);
          if (error.code == 'P2002') {
            throw new ConflictException({
              message: 'Ya existe una empresa con ese CUIT',
            });
          } else {
            throw new InternalServerErrorException();
          }
        }
      }
    }
  }

  async findAdheredLastMonth() {
    const today = new Date();
    const firstDayLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    );
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    return this.db.empresa.findMany({
      where: {
        fechaAdhesion: {
          gte: firstDayLastMonth,
          lte: lastDayLastMonth,
        },
      },
    });
  }
}
