import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiarysModel } from 'src/diarys/entity/diarys.entity';
import { Repository } from 'typeorm';
import { UsersModel } from './entity/users.entity';

@Injectable()
export class UsersService {

    constructor ( 
        @InjectRepository(UsersModel) 
        private readonly usersRepository : Repository<UsersModel>,
    ){}



    async getAllUsers() : Promise<UsersModel[]>{
        const users = await this.usersRepository.find();
        // .createQueryBuilder('user')
        // .leftJoinAndSelect('user.diarys', 'diary')  
        // .getMany();
        return users;

    }

    async createUser(user : Pick<UsersModel,'email' | 'nickName' | 'password'>) : Promise<UsersModel> {
        const nickNameExists = await this.usersRepository.exists({
            where : {
                nickName : user.nickName,
            }
        });

        if(nickNameExists){
            throw new BadRequestException('이미 존재하는 닉네임 입니다.');
        }

        const emaiExists = await this.usersRepository.exists({
            where : {
                email : user.email,
            }
        });

        if(emaiExists) {
            throw new BadRequestException('이미 존재하는 이메일 입니다.');
        }

        const userObject = this.usersRepository.create({
            nickName : user.nickName,
            email : user.email,
            password : user.password
        });

        const newUser = await this.usersRepository.save(userObject);
        return  newUser;
    }

    async deleteUser(user : Pick<UsersModel,'email'>) : Promise<UsersModel> {

        const deleteUser = await this.usersRepository.findOne({
            where : {
                email : user.email,
            }
        });

        await this.usersRepository.delete({
            email : user.email
        });

        return deleteUser; 
    }

    async getDiaryByUser(user : Pick<UsersModel,'email'>) : Promise<DiarysModel[]>{
        const findUser = await this.usersRepository.findOne({
            where : {
                email : user.email
            },
            relations : {
                diarys : true,
            } 

        });
        return findUser.diarys;
    }

    async findUserByEmail(email : string){
        return await this.usersRepository.findOne({
            where : { 
                email : email,
            },
            relations : {
                diarys : true
            },
        });
    }

    

}
