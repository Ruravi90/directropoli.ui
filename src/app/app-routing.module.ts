import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent  } from './pages/signin/signin.component';
import { RegisterComponent  } from './pages/register/register.component';
import { ResetPasswordComponent  } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LandingComponent  } from './pages/landing/landing.component';
import { PaymentComponent } from './pages/payment/payment.component';

import { AuthGuard } from './auth/auth.guard';
import { RememberGuard } from './auth/remember.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate:[RememberGuard]
  },
  {
    path: 'signin/:backUrl',
    component: SigninComponent,
    canActivate:[RememberGuard]
  },
  {
    path: 'signin/invitation/:type/:code/:directoryId',
    component: SigninComponent,
    canActivate:[RememberGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/invitation/:type/:code/:directoryId',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'change-password/:token',
    component: ChangePasswordComponent
  },
  {
    path: 'landing', component: LandingComponent,
  },
  {
    path: 'payment', component: PaymentComponent,
  },
  {
    path: 'public',
    loadChildren: () => import('./layout/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'shared',
    loadChildren: () => import('./layout/shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: 'private',
    loadChildren: () => import('./layout/main/main.module').then(m => m.MainModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: LandingComponent,
    canActivate:[RememberGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
