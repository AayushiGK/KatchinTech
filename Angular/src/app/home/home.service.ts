
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient, public config: ConfigService) { }

  getProducts(callback, errCallback) {
    this.http.get(this.config.baseURL + '/products').subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err.error.content);
    })
  }

  getCount(callback, errCallback) {
    this.http.get(this.config.baseURL + '/countItems').subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err.error.content);
    })
  }

  addProductToCart(product, callback, errCallback) {
    this.http.post(this.config.baseURL + '/addProductToCart', product).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err.error.content);
    })
  }

}
