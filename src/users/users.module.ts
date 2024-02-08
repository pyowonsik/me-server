import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModel } from './entity/users.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([UsersModel]),
  ],
  exports: [TypeOrmModule.forFeature([UsersModel])], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
