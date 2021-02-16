const user = {};

const login = () => {
  user.id = 1;
  user.mail = 'test@mail.ru';

  return user;
};

module.exports = {
  user,
  login,
};
