module.exports = {
  authMiddleware({ req }) {
    let token =
      req.body.token || req.query.token || req.headers.authorization || req.headers.Authorization;

    if (req.headers.authorization || req.headers.Authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }
    req.token = token;

    return req;
  }
};
