import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    this.router.navigate(['/inicio']);
  }
}
