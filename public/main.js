var loginValue = {
  email: $('#email').val(),
  password: $('#psw').val()
};

function login() {
  $.post('http://localhost:8000/api/auth/login', loginValue, function(data) {
    console.log(data);
  });
}

$('#loginButton').click(()=> {
  console.log(loginValue);
})
