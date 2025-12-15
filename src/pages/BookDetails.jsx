import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${id}.json`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (!book) {
    return (
      <>
        <div>
          <p>Book not found</p>
        </div>
      </>
    );
  }

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  return (
    <>
      <div>
        <h1>{book.title}</h1>
        {coverUrl && <img src={coverUrl} alt={book.title} />}

        {book.description && (
          <div>
            <h2>Description</h2>
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          </div>
        )}

        {book.subjects && (
          <div>
            <h2>Subjects</h2>
            <p>{book.subjects.join(", ")}</p>
          </div>
        )}

        {book.first_publish_date && (
          <div>
            <h2>First Published</h2>
            <p>{book.first_publish_date}</p>
          </div>
        )}
      </div>
    </>
  );
}
