import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RoomIdComponent } from './room-id/room-id.component';
import { RoomNameComponent } from './room-name/room-name.component';
import { UserNameComponent } from './user-name/user-name.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', component: RoomIdComponent },
      { path: 'new-room/name', pathMatch: 'full', component: RoomNameComponent },
      { path: 'new-room/user-name', pathMatch: 'full', component: UserNameComponent },
    ],
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class HomeRoutingModule { }
