var ReferralModule = ReferralModule || (function() {
  // Get DOM elements and unique referral code
  const referralConfirmation = document.getElementById('referrer-inactive');
  const checkbox = document.getElementById('rule-confirmation');
  let _userID = '';

  function sendReferralRequest() {
    const url = 'https://a91f674e-10b4-407d-9662-bb936aa8ae28.mock.pstmn.io';
    const data = {
      userID: _userID,
      payload: 'activateReferralProgram',
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Ensure rules are accepted before sending the request
  function handleReferralConfirmation() {
    const button = document.getElementById('referrer-confirmation-button');
    if (button) {
      button.addEventListener('click', function() {
        if (checkbox.checked) {
          sendReferralRequest();
        } else {
          alert('Molimo potvrdite da ste pročitali pravila');
        }
      });
    }
  }

  return {
    init: function(userID) {
      _userID = userID;

      if (referralConfirmation) {
        handleReferralConfirmation();
      }
    }
  };
}());
