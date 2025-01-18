import { StatusCodes } from 'http-status-codes';
import removeEmptyProperty from '../../common/utils/removeEmptyProperty.js';
import validator from '../../common/validations/validator.js';
import zBooks from './books.validation.js';
import BooksService from './books.service.js';

const BooksController = {
    create: async (req, res, next) => {
        try {
            const body = req.body;
            const dto = removeEmptyProperty(body);
            validator(zBooks, dto);
            await BooksService.create(dto);
            res.status(StatusCodes.CREATED).json({ message: "created book successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default BooksController;