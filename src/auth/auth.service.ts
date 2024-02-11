import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersModel } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { HASH_ROUND, JWT_SECRET } from './const/auth.const';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
      private readonly jwtService : JwtService,
      private readonly usersService : UsersService
    ){}

  // 토큰 헤더 분리
  extractTokenFromHeader(header : string , isBearer : boolean){
    const splitTokne = header.split(' ');
    
    const prefix = isBearer ? 'Bearer' : 'Basic';
    
    if(splitTokne.length !== 2 || splitTokne[0] !== prefix){
      throw new UnauthorizedException('잘못된 유형 토큰입니다.');
    }
    
    const token = splitTokne[1];

    return token;
  }

  // 토큰 디코드
  decodeBasicToken(base64String:string){
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');

    const split = decoded.split(':');

    if(split.length !== 2) {
      throw new UnauthorizedException('잘못돈 유형의 토큰입니다.');
    }
    
    const email = split[0];
    const password = split[1];

    return {
      email,
      password
    };
  }

  // 토큰 검증 -> payload 반환
  verifyToken(token:string){
    try{
      return this.jwtService.verify(token,{
        secret : JWT_SECRET
      });
    }catch{
      throw new UnauthorizedException('토큰이 만료되었거나 잘못된 토큰입니다.');
    }
  }  

  // 토큰 재발급
  // async rotateToken(token:string , isRefresh : boolean){

  //   const decoded = this.jwtService.verify(token,{
  //     secret : JWT_SECRET
  //   });

  //   if(decoded.type !== 'isRefresh'){
  //     throw new UnauthorizedException('토큰 발급은 Refresh 토큰으로만 가능합니다.');
  //   }

  //   return this.

  // }

  // 토큰 생성
  signToken(user:Pick<UsersModel,'email' | 'password'>,isRefreshToken : boolean ){

    const payload = { 
      email : user.email,
      password : user.password,
      type : isRefreshToken ? 'refresh' : 'access'
    }

    return this.jwtService.sign(payload,{
      secret : JWT_SECRET,
      expiresIn : isRefreshToken ? 3600 : 300
    });
  }

  // 로그인 
  loginUser(user : Pick<UsersModel,'email' | 'password'>){
    return {
      accessToken : this.signToken(user,false),
      refreshToken : this.signToken(user,true),
    };
  }

  // 유효한 사용자인지 인증 로직
  async authenticateWithEmailAndPassword(user:Pick<UsersModel,'email'|'password'>){
    
    const existingUser = await this.usersService.findUserByEmail(user.email);
    
    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }
    const passOk = await bcrypt.compare(user.password,  existingUser.password); 

    if(!passOk){
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    return existingUser;
  }
  
  // 로그인하여 토근 생성
  async logiWithEmail(user : RegisterUserDto){
    const existingUser = await this.authenticateWithEmailAndPassword(user);
    return this.loginUser(existingUser);
  }

  async registerWithEmail(user : RegisterUserDto){
    const hash = await bcrypt.hash(
      user.password,
      HASH_ROUND
    );

    const newUser = await this.usersService.createUser({
      ...user,
      password : hash
    });
    return this.loginUser(newUser);
  
  }

}
