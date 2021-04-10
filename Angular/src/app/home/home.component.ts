import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products = [];
  constructor(public service: HomeService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts(data => {
      this.products = data.resp;
      console.log(data)
    },
      err => {
        console.log(err.stack);
      })
  }

}
