const path = location.pathname;

if (path === '/signup') require('./page/signup');
if (path === '/login') require('./page/login');
if (path === '/setup') require('./page/setup');
