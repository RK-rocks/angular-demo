import {EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class CartService {
  navchange: EventEmitter<number> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(number) {
    this.navchange.emit(number);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}