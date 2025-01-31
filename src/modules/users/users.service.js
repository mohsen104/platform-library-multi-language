import { Op } from "@sequelize/core";
import Users from "./users.model.js";
import createHttpError from "http-errors";
import UsersMessages from "./users.message.js";
import { StatusCodes } from "http-status-codes";

const UsersService = {
    getAll: async (dto) => {
        const { rows, count } = await Users.findAndCountAll(
            {
                where: {
                    [Op.or]: {
                        first_name: { [Op.like]: `%${dto.q}%` },
                        last_name: { [Op.like]: `%${dto.q}%` },
                        national_code: { [Op.like]: `%${dto.q}%` },
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
        const isExistsUser = await Users.findOne({ where: { national_code: dto.national_code } });
        if (isExistsUser) {
            throw createHttpError(StatusCodes.CONFLICT, UsersMessages.existing);
        }
        await Users.create(dto);
    },
    getOne: async (id) => {
        const user = await Users.findOne({ where: { id } });
        return user.dataValues;
    },
    edit: async (dto, id) => {
        const updatedCount = await Users.update(dto, { where: { id } });
        if (!updatedCount) {
            throw createHttpError(StatusCodes.NOT_FOUND, UsersMessages.not_found);
        }
    },
    remove: async (id) => {
        const deletedCount = await Users.destroy({ where: { id } });
        if (!deletedCount) {
            throw createHttpError(StatusCodes.NOT_FOUND, UsersMessages.not_found);
        }
    }
}

export default UsersService;