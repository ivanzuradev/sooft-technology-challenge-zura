import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Creación exitosa de una empresa.',
    example: {
      id: 12,
      cuit: '23-39148492-9',
      razonSocial: 'Ivan Alejandro Zura',
      fechaAdhesion: '2025-02-01T00:00:00.000Z',
      createdAt: '2025-03-16T23:41:38.526Z',
      updatedAt: '2025-03-16T23:41:38.526Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Request mal formado.',
    example: {
      message: 'string',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cuit: {
          type: 'string',
        },
        razonSocial: {
          type: 'string',
        },
        fechaAdhesion: {
          type: 'string',
          description: 'Formato YYYY-MM-DD',
          example: '2025-02-20',
        },
      },
    },
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Empresas que se registraron el último mes.',
    example: [
      {
        id: 1,
        cuit: '30-71237574-8',
        razonSocial: 'Santander',
        fechaAdhesion: '2025-02-10T00:00:00.000Z',
        createdAt: '2025-03-17T00:30:46.127Z',
        updatedAt: '2025-03-17T00:30:46.127Z',
      },
    ],
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Get('adhered-last-month')
  findAdheredLastMonth() {
    return this.companiesService.findAdheredLastMonth();
  }
}
