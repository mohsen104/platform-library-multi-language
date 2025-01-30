import { StatusCodes } from 'http-status-codes';
import removeEmptyProperty from '../../common/utils/removeEmptyProperty.js';
import validator from '../../common/validations/validator.js';
import zBooks from './books.validation.js';
import BooksService from './books.service.js';
import { zParams } from '../../common/validations/params.js';
import { zQuery } from '../../common/validations/query.js';
import BooksMessage from './books.message.js';
import formatDate from '../../common/utils/formatDate.js';
import formatCurrency from '../../common/utils/formatCurrency.js';

const BooksController = {
    getAll: async (req, res, next) => {
        try {
            const { q = '', order_by = 'added_at', sort_order = 'asc' } = req.query;
            const limit = +req.query?.limit || 10;
            const page = +req.query?.page || 1;
            const dto = { q, order_by, sort_order, limit, page };
            validator(zQuery, dto);
            const { rows, count } = await BooksService.getAll(dto);
            const formattedBooks = rows.map((book) => {
                return {
                    ...book,
                    added_at: formatDate(book.added_at),
                    updated_at: formatDate(book.updated_at),
                    published_year: formatDate(book.published_year),
                    last_borrowed_date: formatDate(book.last_borrowed_date),
                    late_fee_per_day: formatCurrency(book.late_fee_per_day)
                }
            })
            return res.status(StatusCodes.OK).json({ count, page, limit, data: formattedBooks });
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
            return res.status(StatusCodes.CREATED).json({ message: BooksMessage.created });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const book = await BooksService.getOne(id);
            if (!book) return res.status(StatusCodes.NOT_FOUND).json({ message: BooksMessage.not_found });
            const formattedBook = {
                ...book,
                added_at: formatDate(book.added_at),
                updated_at: formatDate(book.updated_at),
                published_year: formatDate(book.published_year),
                last_borrowed_date: formatDate(book.last_borrowed_date),
                late_fee_per_day: formatCurrency(book.late_fee_per_day)
            };
            return res.status(StatusCodes.OK).json({ data: formattedBook });
        } catch (error) {
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const body = req.body;
            const dto = removeEmptyProperty(body);
            validator(zBooks.partial(), dto);
            const updatedCount = await BooksService.edit(dto, id);
            if (!updatedCount) return res.status(StatusCodes.NOT_FOUND).json({ message: BooksMessage.not_found });
            return res.status(StatusCodes.OK).json({ data: BooksMessage.edited });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const deletedCount = await BooksService.remove(id);
            if (!deletedCount) return res.status(StatusCodes.NOT_FOUND).json({ message: BooksMessage.not_found });
            return res.status(StatusCodes.OK).json({ message: BooksMessage.removed });
        } catch (error) {
            next(error);
        }
    }
}

export default BooksController;