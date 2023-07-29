import {TeamDto} from "./team.dto";

export class MemberDto {
  id!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  role: string = 'member';
  teams!: TeamDto[];
}
