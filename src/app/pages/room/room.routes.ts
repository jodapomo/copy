import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },

  {
    path: ':id',
    canActivate: [AuthGuard],
    component: RoomComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
