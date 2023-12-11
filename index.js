const apiUrl = 'https://65745d27f941bda3f2afa877.mockapi.io/user';

function checkCredentials(email, password) {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(users => {
      const user = users.find(u => u["e-mail"] === email && u.password === password);
      
      if (user) {
        console.log('Credentials are valid.');
        const userId = user.id;
        localStorage.setItem('userId', userId);
        window.location.href = 'main.html';
      } else {
        alert('Invalid credentials. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function submitForm(isLogin) {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  if (isLogin) {
    checkCredentials(email, password);
  } else {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value;
    signUp(username, email, password);
  }
}
