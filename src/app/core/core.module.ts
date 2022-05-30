// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Modules
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { UxUiModule } from './components/ux-ui/core.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoadingContainerComponent } from './components/loading-container/loading-container.component';


@NgModule({
  declarations: [
    HeaderNavComponent,
    SideMenuComponent,
    SideNavComponent,
    LoadingContainerComponent,
    NotFoundComponent,
  ],
  exports: [
    SideMenuComponent,
    SideNavComponent,
    HeaderNavComponent,
    LoadingContainerComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, MatIconModule, UxUiModule],

})
export class CoreModule {}
