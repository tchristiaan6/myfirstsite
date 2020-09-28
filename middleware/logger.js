
function log(req, res, next) {
  console.log("I'm in the logger module/function... ");
  next();
}

module.exports = log;
