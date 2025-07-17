import { IsNotEmpty, IsString } from "class-validator"

export class AddingBankDetails {

    @IsString()
    @IsNotEmpty()
    accountNumber: string

    @IsString()
    @IsNotEmpty()
    bankCity: string

    @IsString()
    @IsNotEmpty()
    holdername: string
}