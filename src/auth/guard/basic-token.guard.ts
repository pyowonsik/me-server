// Guard request(요청)시 guard 단에서 header의 authorization의 값이 부적절하다면 Controller - Service - Repository까지 가지 않고 끝낸다.

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Auth } from "typeorm";
import { AuthService } from "../auth.service";

@Injectable()
export class BasicTokenGuard implements CanActivate{

    constructor(private readonly authService : AuthService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();

        const rawToken = req.headers['authorization'];
        
        if(!rawToken) {
            throw new UnauthorizedException('토큰이 없습니다.');
        }

        // token이 분리
        const token = this.authService.extractTokenFromHeader(rawToken,false);

        // 디코딩후 email , password 추출
        const {email,password} = this.authService.decodeBasicToken(token);

        // 추출한 email , password로 user를 찾는다.
        const user = await this.authService.authenticateWithEmailAndPassword({email,password});

        req.user = user;

        return true;
    }
    
}