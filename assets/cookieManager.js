function getCookie(name) {
  const cookieName = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();

    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length);
    }
  }
}

function setCookie(name, value, days) {
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
  } else {
    const expires = '';
    document.cookie = name + '=' + value + expires + '; path=/';
  }
}

function eraseCookie(name) {
  setCookie(name, '', -1);
}

function cookieManager() {
  const queryString = window.location.search;
  const cookieName = 'referral_link';
  const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // 1 year expire
  const stringValidateReg = /refer+=[A-Za-z0-9]/;

  // Make sure only one referral cookie exists
  if (stringValidateReg.test(queryString)) {
    const cookieValue = queryString.replace(/\?refer+=/, '');
    if (!getCookie(cookieName)) {
      setCookie(cookieName, cookieValue, expiryDate);
    } else {
      eraseCookie(cookieName);
      setCookie(cookieName, cookieValue, expiryDate);
    }
  }
  console.log(document.cookie);
}

document.addEventListener('DOMContentLoaded', cookieManager);
