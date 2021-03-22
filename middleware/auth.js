// module.exports = (req, res, next) => {
//   if (!req.user && !['/user/login', '/user/signup'].includes(req.path))
//     res.redirect('/user/login');
//   else next();
// };

module.exports = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (!['/user/login', '/user/signup'].includes(req.path))
      res.redirect('user/login');
    else if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
  }
  next();
};
