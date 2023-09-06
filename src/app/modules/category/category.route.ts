import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
    '/create-category',
    validateRequest(CategoryValidation.createAndUpdateCategory),
    CategoryController.createCategory
);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getCategoryById);
router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.createAndUpdateCategory),
    CategoryController.updateCategory
);
router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    CategoryController.deleteCategory
);

export const CategoryRoutes = router;
