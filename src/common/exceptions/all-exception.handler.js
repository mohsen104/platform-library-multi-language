import { StatusCodes } from "http-status-codes";

function AllExceptionHandler(app) {
  app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(status) || status > 511 || status < 200) status = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err?.message ?? err?.cause ?? 'Internal Server Error';
    logger.error(message);
    if (process.env.NODE_ENV === 'development') {
      res.status(status).json({ code: err?.code, message, stack: err.stack });
    } else {
      res.status(status).json({ message });
    }
  });
}

export default AllExceptionHandler;
