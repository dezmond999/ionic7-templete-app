import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoeditorComponent} from './videoeditor.component'
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideoeditorRoutingModule } from "./videoeditor.routing.module";



@NgModule({
  declarations: [VideoeditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    VideoeditorRoutingModule
  ]
})
export class VideoeditorModule { }
