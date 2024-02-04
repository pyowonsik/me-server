import { Controller } from '@nestjs/common';
import { DiarysService } from './diarys.service';

@Controller('diarys')
export class DiarysController {
  constructor(private readonly diarysService: DiarysService) {}
}
