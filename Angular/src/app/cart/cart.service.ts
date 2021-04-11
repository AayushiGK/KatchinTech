
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http: HttpClient, public config: ConfigService) { }

  getItems(callback, errCallback) {
    this.http.get(this.config.baseURL + '/cart').subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err.content);
    })
  }
}
