// utils/redirectByLevel.js

const redirectByLevel = {
    Administrator: '/admin/dashboard',
    User: '/user/dashboard'
    // tambahkan level lain di sini
  };
  
  export default function getRedirectPath(level) {
    return redirectByLevel[level] || '/main';
  }
  