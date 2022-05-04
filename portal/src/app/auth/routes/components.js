/* eslint-disable */
export const Main = r => require.ensure([], () => r(require('../main')), 'group-auth');
export const Signin = r => require.ensure([], () => r(require('../components/signin')), 'group-auth');
export const Signup = r => require.ensure([], () => r(require('../components/signup')), 'group-auth');
