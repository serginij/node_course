module.exports = (req, res, next) => {
  if (
    (!req.isAuthenticated || !req.isAuthenticated()) &&
    !['/user/login', '/user/signup'].includes(req.path)
  ) {
    if (!req.path.includes('favicon.ico')) {
      req.session.returnTo = req.originalUrl || req.url;
    }

    return res.redirect('/user/login');
  }

  next();
};
