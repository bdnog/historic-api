const jwt = require('jsonwebtoken');

const appSecret = process.env.APP_SECRET;

function sendErrorResponse(res) {
  return res.status(401).send({
    error: 'No valid token provided'
  });
};

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const parts = authorization.split(' ');

    jwt.verify(parts[1], appSecret,
      error => error ? sendErrorResponse(res) : next());

  } else {
    return sendErrorResponse(res);
  }
};
