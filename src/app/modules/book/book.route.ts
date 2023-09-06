import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
    '/create-book',
    validateRequest(BookValidation.createBookValidation),
    BookController.createBook
);
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
