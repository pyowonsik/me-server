import { CommonEntity } from "src/common/entity/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiaryEntity extends CommonEntity{

    @Column()
    title : string

    @Column()
    content : string

    @Column()
    date : string
}