const setHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader("X-Powered-By", "Nothing");
  next();
};

module.exports = {
  setHeaders,
};
