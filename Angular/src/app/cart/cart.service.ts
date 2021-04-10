import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http: HttpClient) { }

  getItems(callback, errCallback) {
    this.http.get('/cart').subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }
}
