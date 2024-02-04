import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiarysModule } from './diarys/diarys.module';

@Module({
  imports: [DiarysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
