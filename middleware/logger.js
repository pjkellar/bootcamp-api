// @desc    Logs request to console
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  // *** Needs to be used in call middleware so that it knows to move to next function in cycle ***
  next();
};

module.exports = logger;
