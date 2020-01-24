import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor() { }
  products =
    [ 
        { name: "Product 1 lorem", additional: "Additional Informations", quantity: 1, unit: "pc", price: 10, thumbnail: "http://via.placeholder.com/200x200" }, 
        { name: "Product 2 ipsum", additional: "Additional Informations", quantity: 1, unit: "kg", price: 20, thumbnail: "http://via.placeholder.com/640x480" }, 
        { name: "Product 3 dolor sit amet", additional: "Additional Informations", quantity: 2, unit: "l", price: 30, thumbnail: "http://via.placeholder.com/1920x1080" },
        { name: "Product 4 consectetur adipiscing elit", additional: "Additional Informations", quantity: 1, unit: "pcs", price: 25, thumbnail: "http://via.placeholder.com/800x400" },
        { name: "Product 5 sed dapibus nibh", additional: "Additional Informations", quantity: 3, unit: "pcs", price: 9, thumbnail: "http://via.placeholder.com/400x800" },
        { name: "Product 6 sit amet maximus ultrices", additional: "Additional Informations", quantity: 1, unit: "pcs", price: 13, thumbnail: "http://via.placeholder.com/2048x1024" },
        { name: "Product 7 duis rutrum", additional: "Additional Informations", quantity: 5, unit: "pcs", price: 200, thumbnail: "http://via.placeholder.com/20x20" },
        { name: "Product 8 efficitur lectus et facilisis", additional: "Additional Informations", quantity: 1, unit: "pc", price: 350, thumbnail: "http://via.placeholder.com/256x64" },
        { name: "Product 9 nulla at ipsum nec risus vestibulum ullamcorper", additional: "Additional Informations", quantity: 10, unit: "pcs", price: 70, thumbnail: "http://via.placeholder.com/64x256" },
        { name: "Product 10 proin facilisis magna", additional: "Additional Informations", quantity: 4, unit: "pcs", price: 1000, thumbnail: "http://via.placeholder.com/1024x768" },
        { name: "Product 11 donec at arcu a tortor pellentesque cursus vel a quam", additional: "Additional Informations", quantity: 300, unit: "pcs", price: 6600, thumbnail: "http://via.placeholder.com/400x100" },
        { name: "Product 12 nulla auctor libero in velit vulputate", additional: "Additional Informations", quantity: 6, unit: "pcs", price: 17.5, thumbnail: "http://via.placeholder.com/100x500" }
    ]
  ngOnInit() {
  }

}
