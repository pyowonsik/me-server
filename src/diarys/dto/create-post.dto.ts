import { PickType } from "@nestjs/mapped-types";
import { DiarysModel } from "../entity/diarys.entity";

export class CreatePostDto extends PickType(DiarysModel,['title','date','content']){} 