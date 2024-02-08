import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers(){
    return this.usersService.getAllUsers();
  }


  @Post('')
  postUser(
    @Body('nickName') nickName : string,
    @Body('email') email : string,
    @Body('password') password : string
  ){
    return  this.usersService.createUser({
      nickName,
      email,
      password
    });
  }

  @Delete('')
  deleteUser(
    @Body('email') email : string
  ){
    return this.usersService.deleteUser({
      email
    });
  }

  @Get('/diarys')
  getDiaryByUser(
    @Body('email') email : string
  ){
    return this.usersService.getDiaryByUser({email});
  }


}


