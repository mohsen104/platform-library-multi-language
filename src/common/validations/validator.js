import { StatusCodes } from 'http-status-codes';
import { fromError } from 'zod-validation-error';

const validator = (schema, data) => {
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: fromError(validationResult.error).message.toString(),
    };
  }
  return data;
};

export default validator;
