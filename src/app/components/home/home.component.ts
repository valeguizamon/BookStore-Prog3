import { Component, OnInit } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  public books = [];
  public book = '';

  ngOnInit(): void {
    this.dataApi.getBooks().subscribe(books =>{
      console.log('BOOKS', books);
    });
  }

}
