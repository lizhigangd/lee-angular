import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagSelectorModule} from "my-lib/tag-selector/tag-selector.module";


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TagSelectorModule],
  providers: [],
})
export class MyLibModule {}
