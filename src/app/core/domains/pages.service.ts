import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  public pageTitle: string;

  constructor() {
    this.pageTitle = '';
  }

  public changeTitle(title: string) {
    this.pageTitle = title;
  }
}
