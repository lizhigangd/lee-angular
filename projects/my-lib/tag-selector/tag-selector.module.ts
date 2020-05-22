import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagSelectorComponent } from './tag-selector.component';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [TagSelectorComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports:[
    TagSelectorComponent
  ]
})
export class TagSelectorModule { }
