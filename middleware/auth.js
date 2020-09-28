
function auth(req, res, next) {
  console.log("I'm in the authentication module/function... ");
  next();
}

module.exports = auth;
