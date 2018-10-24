import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookList from "./Components/BookList";
import BookSearch from "./Components/BookSearch";
import "./App.css";

export default class BooksApp extends Component {
  state = {
    Books: []
  };

  componentDidMount() {
    this.fetch_books_details();
  }

  fetch_books_details = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books });
    });
  };

  update_books_details = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetch_books_details();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBook
              books={this.state.Books}
              onChange={this.update_books_details}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <BookSearch
              onChange={this.update_books_details}
              myBooks={this.state.Books}
            />
          )}
        />
      </div>
    );
  }
}
