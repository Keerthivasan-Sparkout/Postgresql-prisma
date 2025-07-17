import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.cotroller";
import { PrismaModule } from "src/user.prisma/user.prismaModule";

@Module({
    imports:[PrismaModule],
    controllers:[ CompanyController],
    providers:[CompanyService],
    exports:[CompanyService]
})
export class CompanyModule{

}