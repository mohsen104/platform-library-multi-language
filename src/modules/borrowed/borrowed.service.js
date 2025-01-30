import Borrowed from "./borrowed.model.js";

const BorrowedService = {
    record: async (user_id, book_id) => {
        await Borrowed.create({ user_id, book_id });
    },
    return: async (user_id, book_id, fine_amount) => {
        await Borrowed.update(
            { fine_amount, returned_date: Date.now(), status: "returned" },
            { where: { user_id, book_id } },
        );
    },
}

export default BorrowedService;