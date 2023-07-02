import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../providers/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../providers/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // TODO deprecated, comprend pas pq
      this.authService.login(email, password).subscribe(
        (response) => {
          const token = response.token;
          this.authService.storeToken(token);
          this.userService.setCurrentUser().subscribe();
          this.router.navigate(['/home']).then();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
