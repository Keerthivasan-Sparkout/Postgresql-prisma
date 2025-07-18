import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/user.prisma/user.prismaService";
import { UserService } from "src/user/user.service";

@Injectable()
export class TeamService {

    constructor(private prisma: PrismaService, private userService: UserService) { }

    async createTeam(newteam: Prisma.TeamCreateInput, userIds: number[]) {

        return this.prisma.team.create({
            data: {
                team_name: newteam.team_name,
                members: {
                    connect: userIds.map(id => ({ user_id: id })),
                },
            },
        })

    }

    getTeam(team_id: number) {
        return this.prisma.team.findUnique({ where: { id: team_id }, include: { members: true } })
    }

    getTeamByName(teamName:string) {
        return this.prisma.team.findUnique({ where: {team_name : teamName }, include: { members: true } })
    }

    async addNewUser(host: string, email: string, teamName: string) {
        const newUser = await this.userService.getUserByEmail(email)
        if (!newUser) {
            throw new UnauthorizedException("User not found")
        }
        const getTeam = await this.getTeamByName(teamName)
        if (!getTeam) {
            throw new UnauthorizedException("Team doesn't exits")
        }
        const hostname = await this.userService.getUserByEmail(host)
        getTeam.members.push({ user_id: newUser.user_id, user_email: newUser.user_email, user_mobile:    newUser.user_mobile, user_name: newUser.user_name, user_bank: null, comId: newUser.comId })
        this.prisma.team.update({
            where: { id: getTeam.id }, data: {
                members: { connect: getTeam.members.map(id => ({ user_id: id.user_id })), }
            }
        }).then(team => console.log(hostname?.user_name + " add " + newUser.user_name +" in the "+getTeam.team_name))
    }
}