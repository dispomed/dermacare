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

function formAPICall() {
  const form = document.querySelector('form[action$="/account"]');
  const customer = document.querySelector('input[name$="customer[email]"]');
  
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const cookieName = 'referral_link';
    const uniqueReferralCode = getCookie(cookieName);

    if (uniqueReferralCode != null) {
      const url = 'https://a91f674e-10b4-407d-9662-bb936aa8ae28.mock.pstmn.io';
      const data = {
        referralLink: uniqueReferralCode,
        referredUser: customer.value,
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          form.submit();
        })
        .catch((error) => {
          console.error('Error:', error);
          form.submit();
        });
    } else form.submit();
  });
}

document.addEventListener('DOMContentLoaded', formAPICall);