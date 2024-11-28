import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './component/home/home.component';
import { PlayOneVideoComponent } from './component/play-one-video/play-one-video.component';
import { ThemeService } from './service/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { VideoService } from './service/video.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlayOneVideoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    ThemeService,
    VideoService
  ]
})
export class CoreModule { }
