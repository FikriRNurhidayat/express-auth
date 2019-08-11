var redirectButton = document.getElementById("redirectButton");
var loginButton = document.getElementById("loginButton");
var registerButton = document.getElementById("registerButton");
var loginForm = document.getElementById("loginForm");
var registerForm = document.getElementById("registerForm");
var logoutButton = document.getElementById("logoutButton");
var userLogin = document.getElementById("userLogin");
var registerRedirect = document.getElementById("registerRedirect");
var loginRedirect = document.getElementById("loginRedirect");
var isVerified = document.getElementById("helloVerified");

loginForm.style.display = 'none';
registerForm.style.display = 'none';
userLogin.style.display = 'none';

redirectButton.onclick = function() {
  window.open("https://github.com/FikriRNurhidayat/express_auth", "_blank")
};

redirectButton.onmouseover = function() {
  redirectButton.innerHTML = "Click Me!";
};

redirectButton.onmouseout = function() {
  redirectButton.innerHTML = "Github";
};

var token = localStorage.getItem('token');

if (token !== null) {
  async function getUser() {
    let res = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })

    let response = await res.json();

    return response;
  }
  getUser().then(res => {
    userLogin.style.display = "";
    let verifiedElement = document.createElement("h4");
    let verified;

    if (res.data.isVerified) {
      verified = document.createTextNode(`You've verified your email, thank you!`);
    }

    else {
      verified = document.createTextNode(`Please verify your email!`);
    }

    verifiedElement.appendChild(verified);

    let greetElement = document.createElement("h1");
    let greet = document.createTextNode(`Hello, ${res.data.name}!`);
    greetElement.appendChild(greet);

    document.getElementById("helloContainer").appendChild(greetElement);
    isVerified.appendChild(verifiedElement);
    userLogin.style.animation = "appear 2s";

  }).catch(err => {
    console.log(err);
  })
}

if (token == null) {
  loginForm.style.display = '';
}

loginButton.onclick = async function() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var loginRequest = {
    email: email,
    password: password
  }
  let res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(loginRequest)
  })

  let response = await res.json();

  if (response.success) {
    localStorage.setItem('token', response.data);
    window.location.reload();
  }

  else {
    return alert(response.errors);
  }
}

registerButton.onclick = async function() {
  var registerRequest = {
    name: document.getElementById("nameRegister").value,
    email: document.getElementById("emailRegister").value,
    password: document.getElementById("passwordRegister").value,
    password_confirmation: document.getElementById("passwordConfirmationRegister").value,
  }

  let res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(registerRequest)
  })

  let response = await res.json();

  if (response.success) {
    localStorage.setItem('token', response.data);
    window.location.reload();
  }

  else {
    return alert(response.errors);
  }
}

logoutButton.onclick = function() {
  localStorage.removeItem('token');
  return window.location.reload();
}

registerRedirect.onclick = function() {
  loginForm.style.display = 'none';
  registerForm.style.display = '';
  registerForm.style.animation = 'appear 1s';
}

loginRedirect.onclick = function() {
  registerForm.style.display = 'none';
  loginForm.style.display = '';
  loginForm.style.animation = 'appear 1s';
}

function triggerButton(event, button) {
  if (event.keyCode == 13) {
    button.click();
  }
}

// Trigger click button on "Press Enter" event.
document.getElementById("password").addEventListener("keyup", (event) => {
  triggerButton(event, loginButton);
});


document.getElementById("email").addEventListener("keyup", (event) => {
  triggerButton(event, loginButton);
});
