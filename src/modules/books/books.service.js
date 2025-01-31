import { Op } from "@sequelize/core";
import Books from "./books.model.js";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import BooksMessages from "./books.message.js";

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
        const updatedCount = await Books.update(dto, { where: { id } });
        if (!updatedCount) {
            throw createHttpError(StatusCodes.NOT_FOUND, BooksMessages.not_found);
        }
    },
    remove: async (id) => {
        const deletedCount = await Books.destroy({ where: { id } });
        if (!deletedCount) {
            throw createHttpError(StatusCodes.NOT_FOUND, BooksMessages.not_found);
        }
    }
}

export default BooksService;