function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Erreur interne du serveur",
      details: err.details || null,
    },
  });
}
module.exports = errorHandler;