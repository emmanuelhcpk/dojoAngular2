import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'my-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookComponent implements OnInit {
  heading = 'Library';
  cash = 10000;
  books: Book[];
  total = 0;

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.bookService.getBooks()
      .then(books => this.books = books.slice(0, 5));
  }

  totalCost() {
    return this.total;
  }

  castDate(date) {
    return new Date(date);
  }

  cashLeft() {
    return this.cash;
  }

  buy(book) {
    if (book.isAvailable && this.cash >= book.price) {
      this.cash = this.cash - book.price
      this.total+=book.price
      book.isAvailable = false;
    } else {
      alert("You don't have enough cash");
    }
  }

  cancel(book) {
    this.cash = this.cash + book.price
    this.total = this.total -book.price
    book.isAvailable = true;
  }

}
