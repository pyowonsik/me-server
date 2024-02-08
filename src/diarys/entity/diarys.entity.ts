import { CommonEntity } from "src/common/entity/common.entity";
import { UsersModel } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiarysModel extends CommonEntity{

    @Column()
    title : string

    @Column()
    content : string

    @Column()
    date : string

    @ManyToOne(() => UsersModel , (user) => user.diarys,{
        nullable : false
    })
    user : UsersModel;
}