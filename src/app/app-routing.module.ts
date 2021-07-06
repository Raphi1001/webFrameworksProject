import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GameComponent } from './game/game.component';
import { HighscoreListComponent } from './highscore-list/highscore-list.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';
import { ImpressumComponent } from './impressum/impressum.component';


const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'game', component: GameComponent },
{ path: 'highscore-list', component: HighscoreListComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'faq', component: FaqComponent },
{ path: 'impressum', component: ImpressumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
