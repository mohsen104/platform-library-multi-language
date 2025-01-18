import Books from "./books.model.js";

const BooksService = {
    create: async (dto) => {
        await Books.create(dto);
    }
}

export default BooksService;