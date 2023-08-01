import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {PromptDto} from "./dto/prompt.dto";
import {UserDto} from "./dto/user.dto";
import {PromptsService} from "./prompts.service";
import {WorkspaceDto} from "./dto/workspace.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = '/users'

  userAuthenticated: UserDto | null = null;

  public promptList: PromptDto[] = [];
  public promptListIsLoading: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private promptService: PromptsService) {

  }

  register(email: string, password: string, firstname: string, lastname: string): Observable<UserDto> {
    const body = {email, password, firstname, lastname};
    return this.http.post<UserDto>(`${this.apiUrl}/register`, body);
  }

  setCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/current`).pipe(
      tap(user => {
        this.userAuthenticated = user;
        this.setPromptList();
      })
    );
  }

  logout(): void {
    this.authService.logout();
    this.userAuthenticated = null;
  }

  setPromptList(): void {
    this.promptListIsLoading = true;
    this.promptService.getMyPrompts().subscribe(prompts => {
      this.promptList = prompts;
      console.log(this.promptList);
      this.promptListIsLoading = false;
    });
  }

}
