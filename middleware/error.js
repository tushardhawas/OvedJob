class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const message = `Resource not found. Inalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === 11000) {
    const message = `Duplicate ${object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Wen token is Inalid`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = ` Json Wen token is expired `;
    err = new ErrorHandler(message, 400);
  }
  return res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
export default ErrorHandler;