import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiarysModule } from './diarys/diarys.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModel } from './users/entity/users.entity';
import { DiarysModel } from './diarys/entity/diarys.entity';

@Module({

  imports: [
    TypeOrmModule.forRoot({
    type:'postgres',
    host:'127.0.0.1',
    port:5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [
      UsersModel,
      DiarysModel
    ],
    synchronize: true,
  }),
    DiarysModule,
    CommonModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
