import { Component, OnInit } from '@angular/core';
import { Item, ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firstpwa';
  items: Array<Item>;
  constructor(private apiService: ApiService) {}
  ngOnInit() {

  }
  fetchData() {

  }
}