import { StatusCodes } from 'http-status-codes';
import BorrowedService from './borrowed.service.js';
import BorrowedMessages from './borrowed.message.js';

const BorrowedController = {
    record: async (req, res, next) => {
        try {
            const { user_id, book_id } = req.body;
            if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ message: BorrowedMessages.not_user_id });
            if (!book_id) return res.status(StatusCodes.BAD_REQUEST).json({ message: BorrowedMessages.not_book_id });
            await BorrowedService.record(user_id, book_id);
            return res.status(StatusCodes.CREATED).json({ message: BorrowedMessages.recorded });
        } catch (error) {
            next(error);
        }
    },
    return: async (req, res, next) => {
        try {
            const { user_id, book_id, fine_amount } = req.body;
            if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ message: BorrowedMessages.not_user_id });
            if (!book_id) return res.status(StatusCodes.BAD_REQUEST).json({ message: BorrowedMessages.not_book_id });
            await BorrowedService.return(user_id, book_id, fine_amount);
            return res.status(StatusCodes.OK).json({ message: BorrowedMessages.returned });
        } catch (error) {
            next(error);
        }
    },
}

export default BorrowedController;