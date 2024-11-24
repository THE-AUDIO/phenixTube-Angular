import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayOneVideoComponent } from './component/play-one-video/play-one-video.component';

const routes: Routes = [
  {path:"phenixTube",component: HomeComponent},
  {path:'phenixTube/:id', component: PlayOneVideoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
