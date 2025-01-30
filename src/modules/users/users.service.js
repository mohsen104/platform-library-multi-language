import { Op } from "@sequelize/core";
import Users from "./users.model.js";

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
        await Users.create(dto);
    },
    getOne: async (id) => {
        const users = await Users.findOne({ where: { id } });
        return users.dataValues;
    },
    edit: async (dto, id) => {
        return await Users.update(dto, { where: { id } });
    },
    remove: async (id) => {
        return await Users.destroy({ where: { id } });
    }
}

export default UsersService;