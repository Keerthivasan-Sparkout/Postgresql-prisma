import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/user.prisma/user.prismaModule";
import { CompanyModule } from "src/company/company.module";

@Module({
    imports:[PrismaModule,CompanyModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{

}