import { Op } from "@sequelize/core";
import Users from "./users.model.js";

const UsersService = {
    getAll: async (dto) => {
        const { rows, count } = await Users.findAndCountAll(
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
        await Users.create(dto);
    },
    getOne: async (id) => {
        return await Users.findOne({ where: { id } });
    },
    edit: async (dto, id) => {
        return await Users.update(dto, { where: { id } });
    },
    remove: async (id) => {
        return await Users.destroy({ where: { id } });
    }
}

export default UsersService;