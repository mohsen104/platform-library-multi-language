import { StatusCodes } from 'http-status-codes';
import removeEmptyProperty from '../../common/utils/removeEmptyProperty.js';
import validator from '../../common/validations/validator.js';
import zBooks from './books.validation.js';
import BooksService from './books.service.js';
import { zParams } from '../../common/validations/params.js';
import { zQuery } from '../../common/validations/query.js';

const BooksController = {
    getAll: async (req, res, next) => {
        try {
            const { q = '', order_by = 'added_at', sort_order = 'asc' } = req.query;
            const limit = +req.query?.limit || 10;
            const page = +req.query?.page || 1;
            const dto = { q, order_by, sort_order, limit, page };
            validator(zQuery, dto);
            const { rows, count } = await BooksService.getAll(dto);
            res.status(StatusCodes.OK).json({ count, page, limit, data: rows });
        } catch (error) {
            next(error);
        }
    },
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
            validator(zParams, { id });
            const book = await BooksService.getOne(id);
            if (!book) res.status(StatusCodes.NOT_FOUND).json({ message: "No book found with the provided ID." });
            res.status(StatusCodes.OK).json({ data: book });
        } catch (error) {
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const id = req.params.id;
            validator(zParams, { id });
            const body = req.body;
            const dto = removeEmptyProperty(body);
            validator(zBooks.partial(), dto);
            const updatedCount = await BooksService.edit(dto, id);
            if (!updatedCount) res.status(StatusCodes.NOT_FOUND).json({ message: "No book found with the provided ID." });
            res.status(StatusCodes.OK).json({ data: "edited book successfully." });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = req.params.id;
            validator(zParams, { id });
            const deletedCount = await BooksService.remove(id);
            if (!deletedCount) res.status(StatusCodes.NOT_FOUND).json({ message: "No book found with the provided ID." });
            res.status(StatusCodes.OK).json({ message: "removed book successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default BooksController;