import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  constructor() { }
  public items;

  ngOnInit(): void {
  }

  logout(){
    console.log("Site Logout Attempted")
  }

}
