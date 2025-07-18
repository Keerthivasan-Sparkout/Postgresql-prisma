import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";
import { PrismaModule } from "src/user.prisma/user.prismaModule";

@Module({
    imports: [UserModule, PrismaModule],
    controllers: [TeamController],
    providers: [TeamService]
})
export class TeamModules { }