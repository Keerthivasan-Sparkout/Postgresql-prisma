import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/teams.create.dto";
import { UserService } from "src/user/user.service";

@Controller("/team")
export class TeamController {

    constructor(private teamService: TeamService, private userService: UserService) { }

    @Post("/:email")
    async createTeam(@Body() team: CreateTeamDto, @Param('email') email: string) {
        const host = await this.userService.getUserByEmail(email)
        const allId = await Promise.all(team.member?.map(async (mail) => {
            const user = await this.userService.getUserByEmail(mail)
            return user?.user_id || [host?.user_id]
        }))
        const userIds = allId.map(item => parseInt(item.toString(), 10));
        return this.teamService.createTeam(team, userIds)
    }

    @Get("/:name")
    getTeam(@Param('name') name: string) {
        return this.teamService.getTeamByName(name)
    }

    @Patch("/add/:host/:email/:team")
    async addNewUser(@Param('host') hostname: string, @Param('email') email: string, @Param('team') team: string) {
        return this.teamService.addNewUser(hostname, email, team)
    }

}