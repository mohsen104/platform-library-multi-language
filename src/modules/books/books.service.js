import Books from "./books.model.js";

const BooksService = {
    create: async (dto) => {
        await Books.create(dto);
    },
    getOne: async (id) => {
        return await Books.findOne({ where: { id } });
    }
}

export default BooksService;