import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { PresentationComponent } from './component/presentation/presentation.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    PresentationComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
