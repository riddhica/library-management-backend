import express from 'express';
import {
  addBook,
  listAllBooks,
  searchBooks,
  viewBookDetails,
  updateBookDetails,
  removeBook,
} from '../controllers/bookController';

const router = express.Router();

router.post('/', addBook);
router.get('/', listAllBooks);
router.get('/search', searchBooks);
router.get('/:bookId', viewBookDetails);
router.put('/:bookId', updateBookDetails);
router.delete('/:bookId', removeBook);

export default router;
