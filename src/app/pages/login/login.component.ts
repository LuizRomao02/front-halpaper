// src/app/pages/login/login.component.ts
import { Component }               from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService }             from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email    = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    this.auth.login(this.email, this.password).subscribe(success => {
      if (!success) {
        alert('Credenciais inválidas');
        return;
      }

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
        return;
      }

      // fallback por role
      if (this.auth.hasRole('ROLE_MECANICA')) {
        this.router.navigate(['/mecanica/dashboard']);
      } else if (this.auth.hasRole('ROLE_GESTAO')) {
        this.router.navigate(['/gestao/admin']);
      } else if (this.auth.hasRole('ROLE_LOGISTICA')) {
        this.router.navigate(['/logistica/pecas']);
      } else if (this.auth.hasRole('ROLE_PRODUCAO')) {
        this.router.navigate(['/producao/acompanhamento']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
