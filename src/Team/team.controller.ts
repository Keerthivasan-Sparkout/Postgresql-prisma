import { Body, Controller, Param, Post } from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/teams.create.dto";
import { UserService } from "src/user/user.service";

@Controller()
export class TeamController{

    constructor(private teamService:TeamService,private userService:UserService){}

    @Post("/:email")
    async createTeam(@Body() team:CreateTeamDto,@Param('email') email:string){
        const host=await this.userService.getUserByEmail(email)
        const allId=await Promise.all(team.member?.map(async (mail)=>{const user=await this.userService.getUserByEmail(mail)
            return user?.user_id || [host?.user_id]
        }))
       
        
    }

}