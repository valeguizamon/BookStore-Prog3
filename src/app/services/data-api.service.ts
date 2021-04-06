import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookInterface } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
    this.booksCollection = afs.collection<BookInterface>('books');
    this.books = this.booksCollection.valueChanges();
  }

  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;
  
  getBooks(){
    return this.books = this.booksCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as BookInterface;
        data.id = action.payload.doc.id;
        return data;
      })
    }))
  }

  addBook(){

  }

  updateBook(){

  }

  deleteBook(){

  }
}
