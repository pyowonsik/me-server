import { Body, Controller, Headers , Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { AccessTokenGuard, BearerTokenGuard, RefreshTokenGuard } from './guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  // accessToken 재발급
  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  async postTokenAccess(
    @Headers('authorization') rawToken : string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken,true);

    // email:password를 통해 토큰을 분리후 토큰 재발급 로직 사요
    // 토큰 발급시 jwtService.sign()에서 access , refresh 결정
    const newToken = await this.authService.rotateToken(token,false);

    return {
      accessToken : newToken
    };
  }


  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  async postTokenRefresh(
    @Headers('authorization') rawToken : string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken,true);

    const newToken = await this.authService.rotateToken(token,true);

    return {
      refreshToken : newToken
    };
  }

  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  postLoginEmail(
    @Headers('authorization') rawToken : string,
  ){

    const token  = this.authService.extractTokenFromHeader(rawToken,false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.logiWithEmail(credentials)
  }

  @Post('register/email')
  postRegisterEmail(
    @Body() body : RegisterUserDto
  ){
    return this.authService.registerWithEmail(body);
  } 
}
