import { Request, Response } from 'express';
import Book from '../models/bookModel';

export const addBook = async (req: Request, res: Response) => {
  const { title, author, publicationDate, quantity } = req.body;
  try {
    const newBook = new Book({ title, author, publicationDate, quantity });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: 'Error adding book' });
  }
};

export const listAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  const { criteria, keyword } = req.query;
  try {
    const books = await Book.find({ [criteria as string]: { $regex: keyword, $options: 'i' } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error searching books' });
  }
};

export const viewBookDetails = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching book details' });
  }
};

export const updateBookDetails = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const updatedDetails = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedDetails, { new: true });
    if (!updatedBook) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Error updating book details' });
  }
};

export const removeBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    // Successful deletion, sending status 204 (No Content)
    res.status(204).send(); 
  } catch (err) {
    //console.error(err);
    res.status(500).json({ error: 'Error removing book' });
  }
};