import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  public static localhost: string = 'http://127.0.0.1:8000';
  public static website: string = 'https://clenicback.clenic.id';
  public static url: string = GlobalComponent.localhost;
  constructor() { }

  ngOnInit(): void {

  }

}
