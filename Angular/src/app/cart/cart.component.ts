import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public items;
  public total: Number = 0;
  constructor(public service: CartService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.service.getItems(data => {
      this.items = data.msg;
      this.items.forEach(element => {
        this.total += element.products[0].price;
      });
      console.log('this.items', this.items, this.total)
    },
      err => {
        console.log(err);
      })
  }



}
