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
  fullPage = false;

  constructor(
    public pageService: PagesService,
    private router: Router,
  ) {
    this.router.events.subscribe((value) => {
      if (value instanceof ActivationEnd) {
        if (value.snapshot.data['title']) {
          this.pageService.changeTitle(value.snapshot.data['title']);
        }

        if (value.snapshot.data['fullPage']) {
          this.fullPage = value.snapshot.data['fullPage'];
        }

        if (!value.snapshot.data['fullPage']) {
          this.fullPage = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}
