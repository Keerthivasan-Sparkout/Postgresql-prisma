import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { connect } from "http2";
import { PrismaService } from "src/user.prisma/user.prismaService";
import { UserService } from "src/user/user.service";

@Injectable()
export class TeamService {

    constructor(private prisma: PrismaService, private userService: UserService) { }

    async createTeam(newteam: Prisma.TeamCreateInput,userIds:number[]) {
        
        return this.prisma.team.create({
            data: {
                team_name: newteam.team_name,
                members: {
                    connect: userIds.map(id => ({ user_id: id })),
                },
            },
        })

    }
}