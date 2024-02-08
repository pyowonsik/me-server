import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { DiarysModel } from './entity/diarys.entity';

@Injectable()
export class DiarysService {

    constructor(
        @InjectRepository(DiarysModel)
        private readonly diarysRepository : Repository<DiarysModel>,
        @InjectRepository(UsersModel)
        private readonly usersRepository : Repository<UsersModel>
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

        console.log(findUser);

        const diaryObject = this.diarysRepository.create({
            user : findUser,
            ...postDto
        });
        
        const newDiary = this.diarysRepository.save(diaryObject);

        return  newDiary;
    }
    
}
