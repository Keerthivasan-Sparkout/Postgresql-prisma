import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CraeteCompanyDto {

   
    @IsString()
    @IsNotEmpty()
    com_name: string

    @IsString()
    @IsNotEmpty()
    com_address: string


}