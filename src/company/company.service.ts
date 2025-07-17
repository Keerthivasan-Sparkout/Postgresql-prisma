import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/user.prisma/user.prismaService";

@Injectable()
export class CompanyService{

    constructor(private companyPrisma:PrismaService){}

    createCompany(comp:Prisma.CompanyCreateInput){
      return this.companyPrisma.company.create({data:comp})
    }

    getCompanyByName(name:string){
        return this.companyPrisma.company.findUnique({where:{com_name:name}})
    }

    getAllCompanies(){
      return this.companyPrisma.company.findMany()
    }
}