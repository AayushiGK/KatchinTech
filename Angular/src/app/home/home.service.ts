import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }

  getProducts(callback, errCallback) {
    this.http.get('/products').subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }

  addProductToCart(product, callback, errCallback) {
    this.http.post('/addProductToCart', product).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err.stack);
    })
  }

}
