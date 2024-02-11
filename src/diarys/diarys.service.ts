import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { UsersModel } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { DiarysModel } from './entity/diarys.entity';

@Injectable()
export class DiarysService {

    constructor(
        @InjectRepository(DiarysModel)
        private readonly diarysRepository : Repository<DiarysModel>,
        @InjectRepository(UsersModel)
        private readonly usersRepository : Repository<UsersModel>,
        private readonly usersService: UsersService,

    ){}

    async getDiarys() : Promise<DiarysModel[]> {      
        return await this.diarysRepository
        .createQueryBuilder('diarys')
        .leftJoinAndSelect('diarys.user','user')
        .getMany();
    }

    async createDiary(email : string,postDto : CreatePostDto) : Promise<DiarysModel> {

        const findUser = await this.usersRepository.findOne({
            where : {
                email 
            }
        });

        const diaryObject = this.diarysRepository.create({
            user : findUser,
            ...postDto
        });
        
        const newDiary = this.diarysRepository.save(diaryObject);
        return  newDiary;
    }


    // model을 직접찾아서 delete로 지워야함.
    async deleteDiaryByUser(email : string,id : string){
        const findUser = await this.usersService.findUserByEmail(email);
    
        // const deletedDiary = findUser.diarys.filter((e) => e.id != id);

        const deleteDiary = await this.diarysRepository.findOne({where : {
            id 
        }});

        await this.diarysRepository.delete(deleteDiary);

        // return deletedDiary;
    };


    
    
}
