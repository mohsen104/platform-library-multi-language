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
        const users = await Users.findOne({ where: { id } });
        return users.dataValues;
    },
    edit: async (dto, id) => {
        const isExistsUser = await Users.findByPk(id);
        if (!isExistsUser) {
            throw createHttpError(StatusCodes.NOT_FOUND, UsersMessages.not_found);
        }
        return await Users.update(dto, { where: { id } });
    },
    remove: async (id) => {
        return await Users.destroy({ where: { id } });
    }
}

export default UsersService;