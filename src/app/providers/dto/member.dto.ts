import {TeamDto} from "./team.dto";
import {UserDto} from "./user.dto";

export class MemberDto {
  id!: string;
  user!: UserDto;
  role: string = 'member';
  teams!: TeamDto[];
}
