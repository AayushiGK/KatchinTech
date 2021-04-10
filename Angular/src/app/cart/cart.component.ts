import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public items;
  constructor(public service: CartService) { }

  ngOnInit(): void {
  }

  getItems() {
    this.service.getItems(data => {
      this.items = data.resp;
      console.log(data)
    },
      err => {
        console.log(err.stack);
      })
  }



}
