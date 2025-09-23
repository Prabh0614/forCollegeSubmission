import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Add a new book
  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  // Remove a book
  const removeBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  // Filtered books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
      {/* Title */}
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Library Management
      </h1>

      {/* Search bar (full width, own line) */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      {/* Add Book Inputs (on one line, aligned left) */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="New book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: "5px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={{ marginRight: "5px", padding: "8px" }}
        />
        <button onClick={addBook} style={{ padding: "8px 12px" }}>
          Add Book
        </button>
      </div>

      {/* Book List */}
      <div>
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "8px",
            }}
          >
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button onClick={() => removeBook(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;