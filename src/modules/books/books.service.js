import { Op } from "@sequelize/core";
import Books from "./books.model.js";

const BooksService = {
    getAll: async (dto) => {
        const { rows, count } = await Books.findAndCountAll(
            {
                where: {
                    [Op.or]: {
                        title: { [Op.like]: `%${dto.q}%` },
                        author: { [Op.like]: `%${dto.q}%` },
                    }
                },
                order: [[dto.order_by, dto.sort_order]],
                limit: +dto.limit,
                offset: ((+dto.page - 1) * +dto.limit),
                raw: true
            }
        );
        return { rows, count };
    },
    create: async (dto) => {
        await Books.create(dto);
    },
    getOne: async (id) => {
        const book = await Books.findOne({ where: { id } });
        return book.dataValues;
    },
    edit: async (dto, id) => {
        return await Books.update(dto, { where: { id } });
    },
    remove: async (id) => {
        return await Books.destroy({ where: { id } });
    }
}

export default BooksService;