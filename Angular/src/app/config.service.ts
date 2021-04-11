import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public readonly baseURL = "http://localhost:3000";
}
