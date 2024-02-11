import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers(){
    return this.usersService.getAllUsers();
  }

  // @Post('')
  // postUser(
  //   @Body () body : RegisterUserDto
  // ){
  //   return  this.usersService.createUser(body);
  // }

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


