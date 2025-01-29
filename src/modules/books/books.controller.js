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
    },
    getOne: async (req, res, next) => {
        try {
            const id = req.params.id;
            const book = await BooksService.getOne(id);
            if (!book) res.status(StatusCodes.NOT_FOUND).json({ message: "No book found with the provided ID." });
            res.status(StatusCodes.OK).json({ data: book });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = req.params.id;
            const book = await BooksService.remove(id);
            if (!book) res.status(StatusCodes.NOT_FOUND).json({ message: "No book found with the provided ID." });
            res.status(StatusCodes.OK).json({ message: "removed book successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default BooksController;