import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataApiService } from '../../../services/data-api.service';

import { BookInterface } from '../../../models/book';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  
  public books: BookInterface[];

  constructor(private dataApi: DataApiService) {}

  ngOnInit(): void {
    this.getBooksList();
  }

  getBooksList(){
    this.dataApi.getAllBooks().subscribe( books => {
      this.books = books;  
    });
  }

  onDeleteBook(idBook: string){
    const confirmacion = confirm('¿Esta seguro de querer borrar este libro?');
    if(confirmacion){
    this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface){
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
