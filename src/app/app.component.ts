import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { PagesService } from './core/domains/pages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stock-web';

  constructor(
    public pageService: PagesService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((value) => {
      if (value instanceof ActivationEnd && value.snapshot.data['title']) {
        this.pageService.changeTitle(value.snapshot.data['title']);
      }
    });
  }

  ngOnInit(): void {}

  handleRouteChange() {
    console.log('Mudou a rota: ', this.activedRoute);

    // console.log('Mudou teste');
  }
}
