import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/domains/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', (Validators.required, Validators.email)),
    password: new UntypedFormControl('', Validators.required),
  });

  public passwordVisible = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm);

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        // this.router.navigate(['/']);
        this.toastr.success(`Logou com sucesso!`, 'Logou!');
        window.localStorage.setItem('auth_data', JSON.stringify(response));

        console.log(response);
      },
      (error) => {
        console.log(error);
        this.toastr.error(`Erro ao realizar login.`, 'Erro!');

        window.localStorage.clear();
      }
    );

    console.log(this.loginForm.value);
    // this.router.navigate(['/inicio']);
  }
}
