import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/user.prisma/user.prismaService";
import { AddingBankDetails } from "./dto/user.AddingBank";
import { CreatePagination } from "./dto/user.createpagination";
import { CompanyService } from "src/company/company.service";

@Injectable()
export class UserService {

    constructor(private userPrismaservice: PrismaService,private companyService:CompanyService) { }

    async createUser(newUser: Prisma.UserCreateInput) {
        if (await this.getUserByEmail(newUser.user_email)) {
            throw new UnauthorizedException("User email is already exited")
        }
        let getComp=await this.companyService.getCompanyByName(newUser.comp as string)
        if(!getComp){
            throw new UnauthorizedException("company Not Found")
        }
       
        return await this.userPrismaservice.user.create({data:{... newUser,comp:{connect :getComp}
        }})
    }

    async getUserByEmail(email: string) {
        return await this.userPrismaservice.user.findUnique({ where: { user_email: email },include:{comp:true} })
    }

    async getUserIdByEmail(email: string) {
        return await this.userPrismaservice.user.findUnique({ where: { user_email: email },select:{
            user_id:true
    }})
    }

    async updateUser(updateUser: Prisma.UserUpdateInput) {
        if (!updateUser.user_email) {
            throw new UnauthorizedException("Email doesn't exits in your request")
        }
        const getUser = await this.getUserByEmail(updateUser.user_email.toString())
        if (!getUser) {
            throw new UnauthorizedException("Can't find your account")
        }
        return this.userPrismaservice.user.update({ where: { user_id: getUser.user_id }, data: updateUser })
    }

    async getAllUser(pages:CreatePagination) {
        return await this.userPrismaservice.user.findMany({
            take:pages.limit ?? 10,
            skip:((pages.pageNumber*pages.limit)-pages.limit)
        })
    }

    async removeUser(email: string) {
        const getUser = await this.getUserByEmail(email)
        if (!getUser) {
            throw new UnauthorizedException("Can't find your account")
        }
        return this.userPrismaservice.user.delete({ where: { user_id: getUser.user_id } })
    }

    async updateBankDetails(bank: AddingBankDetails, email: string) {

        let getUser = await this.getUserByEmail(email)
        if (!getUser) {
            throw new UnauthorizedException("Can't find your account")
        }
        getUser.user_bank = JSON.stringify(bank)
        const updateduser = getUser as Prisma.UserUncheckedUpdateInput
        return this.userPrismaservice.user.update({ where: { user_id: getUser.user_id }, data: updateduser })

    }
}