import { Injectable } from '@nestjs/common';
import { PrincipalDbService } from '../../db-layer/services/principal-db.service';

@Injectable()
export class BankTransfersService {
  constructor(private db: PrincipalDbService) {}

  async findCompaniesWithTransfersLastMonth() {
    const today = new Date();
    const firstDayLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    );
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    try {
      return await this.db.empresa.findMany({
        where: {
          transferencias: {
            some: {
              fechaTransferencia: {
                gte: firstDayLastMonth,
                lte: lastDayLastMonth,
              },
            },
          },
        },
        include: {
          transferencias: {
            where: {
              fechaTransferencia: {
                gte: firstDayLastMonth,
                lte: lastDayLastMonth,
              },
            },
          },
        },
      });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
