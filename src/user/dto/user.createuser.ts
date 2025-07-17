import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    user_name: string

    @IsString()
    @IsNotEmpty()
    user_email: string

    @IsString()
    @IsNotEmpty()
    user_mobile: string

    @IsNumber()
    @IsOptional()
    comp:string | any
}