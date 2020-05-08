import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ScoreboardComponent } from './scoreboard/scoreboard.component'
import { SettingComponent } from './setting/setting.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sboard',
    component: ScoreboardComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
