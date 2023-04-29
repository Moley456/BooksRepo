DROP TABLE IF EXISTS authors, books;

CREATE TABLE authors (
    name VARCHAR(50) PRIMARY KEY,
    biography VARCHAR(1000)
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    publisher VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    authorId VARCHAR(100) NOT NULL,
    FOREIGN KEY (authorId) REFERENCES authors (name) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION delete_author_if_no_books()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM books
    WHERE books.authorId = OLD.authorId
  ) THEN
    DELETE FROM authors
    WHERE name = OLD.authorId;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER books_delete_trigger
AFTER DELETE ON books
FOR EACH ROW
EXECUTE FUNCTION delete_author_if_no_books();
