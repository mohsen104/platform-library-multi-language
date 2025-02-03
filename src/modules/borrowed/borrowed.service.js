import { StatusCodes } from "http-status-codes";
import BorrowedMessages from "./borrowed.message.js";
import Borrowed from "./borrowed.model.js";
import createHttpError from "http-errors";
import Books from "../books/books.model.js";
import Users from "../users/users.model.js";

const BorrowedService = {
    record: async (user_id, book_id) => {
        const isExistsUser = await Users.findByPk(user_id);
        if (!isExistsUser) {
            // throw new
        }
        const book = await Books.findByPk(book_id);
        if (!book) {
            // throw new
        }
        if (!book.quantity_available) {
            // throw new
        }
        const isExistsRecord = await Borrowed.findOne({ where: { user_id, book_id } });
        if (isExistsRecord) {
            // throw new
        }
        await Borrowed.create({ user_id, book_id });
    },
    return: async (user_id, book_id, fine_amount) => {
        const isExistsRecord = await Borrowed.findOne({ where: { user_id, book_id } });
        if (isExistsRecord) {
            throw createHttpError(StatusCodes.CONFLICT, BorrowedMessages.already_borrowed);
        }
        if (isExistsRecord.status === "returned") {
            throw createHttpError(StatusCodes.CONFLICT, BorrowedMessages.already_returned);
        }
        await Borrowed.update(
            { fine_amount, returned_date: Date.now(), status: "returned" },
            { where: { user_id, book_id } },
        );
    },
}

export default BorrowedService;