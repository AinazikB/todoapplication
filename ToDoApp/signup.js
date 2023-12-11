const apiUrl = 'https://65745d27f941bda3f2afa877.mockapi.io/user';

function signUp(username, email, password) {
    const newUser = {
      name: username,
      'e-mail': email,
      password: password,
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const userId = data.id;
        localStorage.setItem('userId', userId);
        window.location.href = 'main.html';
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  }
