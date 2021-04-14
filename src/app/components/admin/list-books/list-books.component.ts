import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { DataApiService } from '../../../services/data-api.service';
import { AuthService } from '../../../services/auth.service';

import { BookInterface } from '../../../models/book';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  
  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(private dataApi: DataApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getBooksList();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('administrador');
        })
      }
    })
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
