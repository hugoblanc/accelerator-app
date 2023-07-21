import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../providers/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../providers/user.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
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
      this.isLoading = true;
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => this.loginSuccess(response),
        (error) => this.loginError(error),
        () => this.isLoading = false
      );
    }
  }

  loginSuccess(response: any) {
    const token = response.token;
    this.authService.storeToken(token);
    this.userService.setCurrentUser().subscribe();
    this.router.navigate(['/gallery']).then();
  }

  loginError(error: any) {
    this.snackBar.open('There is no user record corresponding to this identifier or the password is incorrect', undefined, {
      panelClass: 'snackbar-error',
      duration: 5000,
    });
  }
}
