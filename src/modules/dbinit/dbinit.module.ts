import { Module } from '@nestjs/common';
import { UserInitModule } from './user/userInitModule';
import { DbinitService } from './dbinit.service';
import { DbinitController } from './dbinit.controller';

@Module({
  imports: [UserInitModule],
  providers: [DbinitService],
  controllers: [DbinitController],
})
export class DbinitModule {}
