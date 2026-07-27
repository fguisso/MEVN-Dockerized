const needAuth = (auth) => auth === true;

const beforeEach = (to) => {
  const auth = to.meta.requiresAuth;
  if (!needAuth(auth)) return true;
  if (localStorage.id_token !== null && localStorage.length > 0) return true;
  return { name: 'auth.signin' };
};

export default beforeEach;
