import {  DiarysModel } from "src/diarys/entity/diarys.entity";
import { CommonEntity } from "src/common/entity/common.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class UsersModel extends CommonEntity{

    @Column()
    email : string;

    @Column()
    password : string;

    @Column()
    nickName : string;


    @OneToMany(() => DiarysModel , (diary) => diary.user)
    diarys : DiarysModel[];

}