import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
    '/',
    validateRequest(CategoryValidation.createAndUpdateCategory),
    CategoryController.createCategory
);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getCategoryById);
router.patch(
    '/:id',
    validateRequest(CategoryValidation.createAndUpdateCategory),
    CategoryController.updateCategory
);
router.delete('/:id', CategoryController.deleteCategory);

export const CategoryRoutes = router;
