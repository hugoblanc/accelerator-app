import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserDto} from "./dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.apiUrl + '/users'

  userAuthenticated: UserDto | null = null;

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<UserDto> {
    const body = { email, password };
    return this.http.post<UserDto>(`${this.apiUrl}/register`, body);
  }

  setCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/current`).pipe(
      tap(user => {
        this.userAuthenticated = user;
        console.log(this.userAuthenticated);
      })
    );
  }

}
