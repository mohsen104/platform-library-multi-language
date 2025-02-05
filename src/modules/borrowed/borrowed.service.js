import { StatusCodes } from "http-status-codes";
import BorrowedMessages from "./borrowed.message.js";
import Borrowed from "./borrowed.model.js";
import createHttpError from "http-errors";
import Books from "../books/books.model.js";
import Users from "../users/users.model.js";

const BorrowedService = {
    record: async (user_id, book_id) => {
        const user = await Users.findByPk(user_id);
        if (!user) {
            throw createHttpError(StatusCodes.NOT_FOUND, BorrowedMessages.not_found_user);
        }
        const book = await Books.findByPk(book_id);
        if (!book) {
            throw createHttpError(StatusCodes.NOT_FOUND, BorrowedMessages.not_found_book);
        }
        if (!book.quantity_available) {
            throw createHttpError(StatusCodes.BAD_REQUEST, BorrowedMessages.out_of_stock);
        }
        const isExistsRecord = await Borrowed.findOne({ where: { user_id, book_id } });
        if (isExistsRecord) {
            throw createHttpError(StatusCodes.CONFLICT, BorrowedMessages.already_borrowed);
        }
        book.last_borrowed_date = Date.now();
        book.times_borrowed += 1;
        book.quantity_available -= 1;
        if (book.quantity_available) {
            book.status = 0;
        }
        await book.save();

        user.borrow_limit += 1;
        await user.save();

        await Borrowed.create({ user_id, book_id });
    },
    return: async (user_id, book_id, borrow_fee) => {
        const user = await Users.findByPk(user_id);
        if (!user) {
            throw createHttpError(StatusCodes.NOT_FOUND, BorrowedMessages.not_found_user);
        }
        const book = await Books.findByPk(book_id);
        if (!book) {
            throw createHttpError(StatusCodes.NOT_FOUND, BorrowedMessages.not_found_book);
        }
        if (!book.quantity_available) {
            throw createHttpError(StatusCodes.BAD_REQUEST, BorrowedMessages.out_of_stock);
        }
        const isExistsRecord = await Borrowed.findOne({ where: { user_id, book_id } });
        if (!isExistsRecord) {
            throw createHttpError(StatusCodes.CONFLICT, BorrowedMessages.not_borrowed_yet);
        }
        if (isExistsRecord.status === 0) {
            throw createHttpError(StatusCodes.CONFLICT, BorrowedMessages.already_returned);
        }
        book.quantity_available += 1;
        if (book.status === 0) {
            book.status = 1;
        }
        await book.save();

        user.borrow_limit += 1;
        await user.save();

        await Borrowed.update(
            { borrow_fee, returned_date: Date.now(), status: 1 },
            { where: { user_id, book_id } },
        );
    },
}

export default BorrowedService;