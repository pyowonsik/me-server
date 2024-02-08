import { Module } from '@nestjs/common';
import { DiarysService } from './diarys.service';
import { DiarysController } from './diarys.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModule } from 'src/users/users.module';
import { DiarysModel } from './entity/diarys.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DiarysModel]),
    UsersModule,
  ],
  controllers: [DiarysController],
  providers: [DiarysService],
})
export class DiarysModule {}
