import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Book() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://openlibrary.org/search.json?q=programming"
        );
        setBooks(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div>
        <h1>Programming Books</h1>
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div>
            {books.map((book) => {
              const id = book.key.split("/").pop();
              const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null;

              return (
                <div key={book.key}>
                  <Link to={`/books/${id}`}>
                    {coverUrl && <img src={coverUrl} alt={book.title} />}
                    <h3>{book.title}</h3>
                  </Link>
                  <p>
                    {book.author_name
                      ? book.author_name.join(", ")
                      : "Unknown Author"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
