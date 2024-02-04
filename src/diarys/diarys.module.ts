import { Module } from '@nestjs/common';
import { DiarysService } from './diarys.service';
import { DiarysController } from './diarys.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:'postgres',
    host:'127.0.0.1',
    port:5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [],
    synchronize: true,
  }),
    DiarysModule,
  ],
  controllers: [DiarysController],
  providers: [DiarysService],
})
export class DiarysModule {}
