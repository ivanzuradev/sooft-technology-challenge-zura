import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DbLayerModule } from '../db-layer/db-layer.module';

@Module({
  imports: [DbLayerModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
