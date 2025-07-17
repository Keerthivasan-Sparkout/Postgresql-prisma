import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CraeteCompanyDto } from "./dto/com.create.dto";
import { CompanyService } from "./company.service";

@Controller("/com")
export class CompanyController{

    constructor(private companyService:CompanyService){}

    @Post()
    craeteCompany(@Body() com:CraeteCompanyDto){
        return this.companyService.createCompany(com)
    }

    @Get()
    getAllCompany(){
        return this.companyService.getAllCompanies()
    }

    @Get("/byname/:comName")
    getCompanyByName(@Param('comName') comName:string){
        return this.companyService.getCompanyByName(comName)
    }
    
}