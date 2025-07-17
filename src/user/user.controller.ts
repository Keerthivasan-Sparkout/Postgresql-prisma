import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.createuser";
import { UpdateUserDto } from "./dto/user.updateuser";
import { AddingBankDetails } from "./dto/user.AddingBank";
import { CreatePagination } from "./dto/user.createpagination";

@Controller("/user")
export class UserController{

    constructor(private userService:UserService){}

    @Post()
    createUser(@Body() user:CreateUserDto){
        return this.userService.createUser(user)
    }

    @Get()
    getAllUser(@Body() pages:CreatePagination){
        return this.userService.getAllUser(pages)
    }

    @Get("/byemail/:email")
    async getUserByEmail(@Param('email') email:string){
        return await this.userService.getUserByEmail(email)
    }

    @Patch()
    updateUser(@Body() user:UpdateUserDto){
        return this.userService.updateUser(user)
    }

    @Delete("/:email")
    deleteUser(@Param('email') email:string){
        return this.deleteUser(email)
    }

    @Patch("/add-bank/:email")
    async addingBankDetails(@Body() bank:AddingBankDetails,@Param('email') email:string){
        const returnObj=await this.userService.updateBankDetails(bank,email)
        return returnObj;
    }

}