import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  letorderData = []
  constructor(
    private activatedRoute :ActivatedRoute
  ) { }

  ngOnInit() {
    this.letorderData = this.activatedRoute.snapshot.data['event'].data.orderData;
  }
}
