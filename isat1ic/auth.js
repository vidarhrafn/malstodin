// ÍSAT1ÍC Authentication Check
// Þessi skrá athugar hvort nemandi er innskráður

(function() {
  // Athuga hvort notandi er innskráður
  const userDataString = localStorage.getItem('isat1ic_user');
  
  if (!userDataString) {
    // Enginn notandi - senda á login síðu
    window.location.href = '/isat1ic/login.html';
    return;
  }

  try {
    const userData = JSON.parse(userDataString);
    
    // Athuga hvort gögnin eru gild
    if (!userData.id || !userData.username) {
      // Gögn eru skemmd - senda á login síðu
      localStorage.removeItem('isat1ic_user');
      window.location.href = '/isat1ic/login.html';
      return;
    }

    // Allt í lagi! Notandi er innskráður
    console.log('✅ Innskráður sem:', userData.username, '(' + userData.role + ')');

  } catch (error) {
    // Villa við að lesa gögn - senda á login síðu
    localStorage.removeItem('isat1ic_user');
    window.location.href = '/isat1ic/login.html';
  }
})();

// Helper functions sem æfingar geta notað

// Sækja notandaupplýsingar
function getCurrentUser() {
  const userDataString = localStorage.getItem('isat1ic_user');
  if (!userDataString) return null;
  try {
    return JSON.parse(userDataString);
  } catch (error) {
    return null;
  }
}

// Útskráning
function logout() {
  localStorage.removeItem('isat1ic_user');
  window.location.href = '/isat1ic/login.html';
}
