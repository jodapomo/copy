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
      { path: '', pathMatch: 'full', component: RoomIdComponent, data: { order: 1 } },
      { path: 'new-room/name', pathMatch: 'full', component: RoomNameComponent, data: { order: 2 } },
      { path: 'new-room/username', pathMatch: 'full', component: UserNameComponent, data: { order: 3 } },
    ],
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class HomeRoutingModule { }
