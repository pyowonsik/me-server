import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiaryEntity {

    @PrimaryGeneratedColumn()
    id : string;



}