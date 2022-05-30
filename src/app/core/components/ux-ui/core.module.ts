// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Modules
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    SearchInputComponent,
  ],
  exports: [SearchInputComponent],
  imports: [CommonModule],
})
export class UxUiModule {}
