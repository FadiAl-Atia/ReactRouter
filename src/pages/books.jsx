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
      <style>{`
        .books-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }

        .books-header {
          text-align: center;
          color: white;
          margin-bottom: 50px;
        }

        .books-header h1 {
          font-size: 3.5rem;
          margin-bottom: 10px;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .books-header p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-container p {
          color: white;
          font-size: 1.2rem;
          margin-top: 20px;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .book-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }

        .book-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .book-cover {
          width: 100%;
          height: 350px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .book-card:hover .book-cover img {
          transform: scale(1.05);
        }

        .no-cover {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #999;
        }

        .book-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 10px;
        }

        .book-info {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .book-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 10px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .book-author {
          color: #718096;
          font-size: 0.95rem;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .book-year {
          color: #a0aec0;
          font-size: 0.85rem;
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .books-header h1 {
            font-size: 2.5rem;
          }

          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }

          .book-cover {
            height: 280px;
          }
        }
      `}</style>

      <div className="books-container">
        <div className="books-header">
          <h1>Programming Books</h1>
          <p>Discover the best programming resources</p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => {
              const id = book.key.split("/").pop();
              const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null;

              return (
                <Link to={`/books/${id}`} key={book.key} className="book-card">
                  <div className="book-cover">
                    {coverUrl ? (
                      <img src={coverUrl} alt={book.title} />
                    ) : (
                      <div className="no-cover">
                        <svg
                          className="book-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span>No Cover Available</span>
                      </div>
                    )}
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Unknown Author"}
                    </p>
                    {book.first_publish_year && (
                      <p className="book-year">
                        Published: {book.first_publish_year}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
