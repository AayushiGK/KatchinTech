import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public service: HomeService) { }
  @Input() product = {
    p_id: "",
    name: "",
    price: "",
    description: "",
    image: ""
  };
  public itemsCount;

  ngOnInit(): void {
  }

  addProductToCart(item) {
    this.service.getCount(data => { this.itemsCount = data.msg; }, err => { console.log(err) });
    this.service.addProductToCart(item, data => { console.log("Added"); }, err => { console.log(err); });
  }

}
