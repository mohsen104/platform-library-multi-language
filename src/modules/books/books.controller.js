import { StatusCodes } from 'http-status-codes';
import validator from '../../common/validations/validator.js';
import zBooks from './books.validation.js';
import BooksService from './books.service.js';
import { zParams } from '../../common/validations/params.js';
import { zQuery } from '../../common/validations/query.js';
import BooksMessages from './books.message.js';
import formatDate from '../../common/utils/formatDate.js';
import formatCurrency from '../../common/utils/formatCurrency.js';
import cleanedData from '../../common/utils/cleanedData.js';

const BooksController = {
    getAll: async (req, res, next) => {
        try {
            const { q = '', order_by = 'added_at', sort_order = 'asc' } = req.query;
            const limit = +req.query?.limit || 10;
            const page = +req.query?.page || 1;
            const dto = { q, order_by, sort_order, limit, page };
            validator(zQuery, dto);
            const { rows, count } = await BooksService.getAll(dto);
            if (!rows.length) {
                return res.status(StatusCodes.OK).json({ message: BooksMessages.no_books_found });
            }
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
            const dto = validator(zBooks, cleanedData(body));
            await BooksService.create(dto);
            return res.status(StatusCodes.CREATED).json({ message: BooksMessages.created });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const book = await BooksService.getOne(id);
            if (!book) return res.status(StatusCodes.NOT_FOUND).json({ message: BooksMessages.not_found });
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
            const dto = validator(zBooks.partial(), cleanedData(body));
            await BooksService.edit(dto, id);
            return res.status(StatusCodes.OK).json({ data: BooksMessages.edited });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            await BooksService.remove(id);
            return res.status(StatusCodes.OK).json({ message: BooksMessages.removed });
        } catch (error) {
            next(error);
        }
    }
}

export default BooksController;