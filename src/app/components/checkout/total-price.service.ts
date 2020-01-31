import {EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TotalPriceService {
  paytotalchange: EventEmitter<number> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(number) {
    this.paytotalchange.emit(number);
  }
  getNavChangeEmitter() {
    return this.paytotalchange;
  }
}