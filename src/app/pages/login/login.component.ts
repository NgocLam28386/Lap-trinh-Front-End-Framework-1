import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  handleLogin() {
    console.log(this.loginForm);
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.accessToken);
        this.router.navigateByUrl('/product/list');
      },
      error: () => alert('Sai tên đăng nhập hoặc mật khẩu!!!!!!!!!!!!!'),
    });
  }
}
