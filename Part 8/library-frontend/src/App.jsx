import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm"
import Recommendation from "./components/Recommendation"
import { ALL_BOOKS, BOOK_ADDED } from "./queries"


export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery(query, ({ allBooks }) => {
    const exists = allBooks.some(book => book.id === addedBook.id)
    return exists ? { allBooks } : { allBooks: [...allBooks, addedBook]}
  })
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  
  
  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      // window.alert(`book '${addedBook.title}' has been added`)
      console.log(addedBook)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
    onError: (error) => {
      console.error("Subscription error: ", error)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("books")
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token}/>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setPage={setPage} />

      <Recommendation show={page === "recommend"} />

      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
