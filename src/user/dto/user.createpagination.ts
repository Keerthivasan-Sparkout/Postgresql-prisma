import { IsNumber, IsOptional } from "class-validator";

export class CreatePagination{

    @IsNumber()
    @IsOptional()
    limit:number

    @IsNumber()
    @IsOptional()
    pageNumber:number


}