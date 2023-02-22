import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [{path: '', component: HomePageComponent}, {path: 'user/:address', component: UserPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
