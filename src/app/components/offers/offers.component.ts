import { Component, OnInit } from '@angular/core';

import { BookInterface } from 'src/app/models/book';
import { DataApiService } from '../../services/data-api.service';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }

  public books: BookInterface[];

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    this.dataApi.getAllBooksOffers().subscribe(offers => this.books = offers);
  }
}
