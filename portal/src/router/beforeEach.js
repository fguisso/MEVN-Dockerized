const needAuth = (auth) => auth === true;

const beforeEach = (to, from, next) => {
  const auth = to.meta.requiresAuth;
  if (!needAuth(auth)) {
    next();
    return;
  }
  if (localStorage.id_token !== null && localStorage.length > 0) next();
  else next({ name: 'auth.signin' });
};

export default beforeEach;
