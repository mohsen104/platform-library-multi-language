import { StatusCodes } from 'http-status-codes';
import removeEmptyProperty from '../../common/utils/removeEmptyProperty.js';
import validator from '../../common/validations/validator.js';
import zUsers from './users.validation.js';
import UsersService from './users.service.js';
import { zParams } from '../../common/validations/params.js';
import { zQuery } from '../../common/validations/query.js';
import UsersMessages from './users.message.js';
import formatDate from '../../common/utils/formatDate.js';

const UsersController = {
    getAll: async (req, res, next) => {
        try {
            const { q = '', order_by = 'added_at', sort_order = 'asc' } = req.query;
            const limit = +req.query?.limit || 10;
            const page = +req.query?.page || 1;
            const dto = { q, order_by, sort_order, limit, page };
            validator(zQuery, dto);
            const { rows, count } = await UsersService.getAll(dto);
            const formattedUsers = rows.map(user => {
                return {
                    ...user,
                    added_at: formatDate(user.added_at),
                    updated_at: formatDate(user.updated_at),
                };
            })
            return res.status(StatusCodes.OK).json({ count, page, limit, data: formattedUsers });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const body = req.body;
            const dto = removeEmptyProperty(body);
            validator(zUsers, dto);
            await UsersService.create(dto);
            return res.status(StatusCodes.CREATED).json({ message: UsersMessages.created });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const user = await UsersService.getOne(id);
            if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: UsersMessages.not_found });
            const formattedUser = {
                ...user,
                added_at: formatDate(user.added_at),
                updated_at: formatDate(user.updated_at),
            };
            return res.status(StatusCodes.OK).json({ data: formattedUser });
        } catch (error) {
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const body = req.body;
            const dto = removeEmptyProperty(body);
            validator(zUsers.partial(), dto);
            const updatedCount = await UsersService.edit(dto, id);
            if (!updatedCount) return res.status(StatusCodes.NOT_FOUND).json({ message: UsersMessages.not_found });
            return res.status(StatusCodes.OK).json({ data: UsersMessages.edited });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const deletedCount = await UsersService.remove(id);
            if (!deletedCount) return res.status(StatusCodes.NOT_FOUND).json({ message: UsersMessages.not_found });
            return res.status(StatusCodes.OK).json({ message: UsersMessages.removed });
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;