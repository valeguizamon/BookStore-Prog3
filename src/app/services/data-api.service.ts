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
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;

  getAllBooks() {
    return this.books = this.booksCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as BookInterface;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
  }

  getBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists == false){
        return null;
      } else {
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addBook(book: BookInterface): void{
    this.booksCollection.add(book);
  }

  updateBook(book: BookInterface): void{
    let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }

  deleteBook(idBook: string): void{
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }
}
