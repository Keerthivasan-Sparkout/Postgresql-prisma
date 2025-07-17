import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    user_name: string

    @IsString()
    @IsNotEmpty()
    user_email: string

    @IsString()
    @IsOptional()
    user_mobile: string

}