import { Module } from "@nestjs/common";
import { PrismaService } from "./user.prismaService";

@Module({
    providers:[PrismaService],
    exports:[PrismaService]
})
export class PrismaModule{}