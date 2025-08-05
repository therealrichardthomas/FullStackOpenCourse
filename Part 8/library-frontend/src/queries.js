import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($name: String, $genre: String) {
    allBooks(name: $name, genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const ME = gql`
  query me{
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`