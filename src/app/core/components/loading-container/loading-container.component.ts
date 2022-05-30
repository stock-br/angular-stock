import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-container',
  templateUrl: './loading-container.component.html',
  styleUrls: ['./loading-container.component.scss'],
})
export class LoadingContainerComponent implements OnInit {
  @Input() height: number | string = 400;

  constructor() {}

  ngOnInit(): void {}
}
