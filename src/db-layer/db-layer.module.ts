import { Module } from '@nestjs/common';
import { PrincipalDbService } from './services/principal-db.service';

@Module({
  providers: [PrincipalDbService],
  exports: [PrincipalDbService],
})
export class DbLayerModule {}
