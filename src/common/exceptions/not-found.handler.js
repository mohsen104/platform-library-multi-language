import { StatusCodes } from "http-status-codes";

function NotFoundHandler(app) {
  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Not Found Route',
      method: req.method,
      url: req.originalUrl,
    });
  });
}

export default NotFoundHandler;
