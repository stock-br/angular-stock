import { Component, Input, OnInit } from '@angular/core';
import { PagesService } from '../../domains/pages.service';

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  @Input('title') title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
