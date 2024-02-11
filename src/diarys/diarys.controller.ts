import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DiarysService } from './diarys.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('diarys')
export class DiarysController {
  constructor(
    private readonly diarysService: DiarysService,
    ) {}


  @Get('')
  getDiarys(){
    return this.diarysService.getDiarys();
  }


  @Post('')
  postDiarys(
    @Body('email') email: string,
    @Body() body : CreatePostDto
  ){
    return this.diarysService.createDiary(email,body);
  }
  
  @Delete('')
  deleteDiaryByUser(
    @Body('email') email : string,
    @Body('id') id : string,
  ){
    return this.diarysService.deleteDiaryByUser(email,id); 
  }

}
