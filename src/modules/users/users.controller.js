import { StatusCodes } from 'http-status-codes';
import removeEmptyProperty from '../../common/utils/removeEmptyProperty.js';
import validator from '../../common/validations/validator.js';
import zUsers from './users.validation.js';
import UsersService from './users.service.js';
import { zParams } from '../../common/validations/params.js';
import { zQuery } from '../../common/validations/query.js';
import UsersMessages from './users.message.js';

const UsersController = {
    getAll: async (req, res, next) => {
        try {
            const { q = '', order_by = 'added_at', sort_order = 'asc' } = req.query;
            const limit = +req.query?.limit || 10;
            const page = +req.query?.page || 1;
            const dto = { q, order_by, sort_order, limit, page };
            validator(zQuery, dto);
            const { rows, count } = await UsersService.getAll(dto);
            res.status(StatusCodes.OK).json({ count, page, limit, data: rows });
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
            res.status(StatusCodes.CREATED).json({ message: UsersMessages.created });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const user = await UsersService.getOne(id);
            if (!user) res.status(StatusCodes.NOT_FOUND).json({ message: UsersMessages.created });
            res.status(StatusCodes.OK).json({ data: user });
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
            if (!updatedCount) res.status(StatusCodes.NOT_FOUND).json({ message: "No user found with the provided ID." });
            res.status(StatusCodes.OK).json({ data: "edited user successfully." });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = +req.params.id;
            validator(zParams, { id });
            const deletedCount = await UsersService.remove(id);
            if (!deletedCount) res.status(StatusCodes.NOT_FOUND).json({ message: "No user found with the provided ID." });
            res.status(StatusCodes.OK).json({ message: "removed user successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;