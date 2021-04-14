import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookInterface } from 'src/app/models/book';

import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  constructor(public dataApi: DataApiService) {}

  ngOnInit(): void {}

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      //Libro nuevo
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else {
      //Modificar libro
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
