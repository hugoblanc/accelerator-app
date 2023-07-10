import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../providers/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../providers/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private snackBarService: MatSnackBar,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      // Envoyez les données du formulaire au backend pour créer un compte utilisateur
      const userData = this.signUpForm.value;
      this.userService.register(userData.email, userData.password, userData.firstname, userData.lastname)
        .subscribe(
          (result) => {
            this.snackBarService.open('User account has been created successfully', 'Close', {duration : 2000});
            // Login the user to have his jwt token
            this.authService.login(userData.email, userData.password).subscribe(
              (response) => {
                const token = response.token;
                this.authService.storeToken(token);
                this.userService.setCurrentUser().subscribe();
                this.router.navigate(['/gallery']).then();
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
    }
  }
}
