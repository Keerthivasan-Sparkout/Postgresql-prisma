import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto{

    @IsString()
    @IsNotEmpty()
    team_name:string

    @IsArray()
    @IsNotEmpty()
    member:string[]

}