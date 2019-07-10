var email;
var password;
$('#loginButton').click(()=> {
  email = $('#email').val();
  password = $('#password').val();
  if (email != "" && password !="") {
    $.ajax({
      type: "POST",
      url: "https://api-auth-training.herokuapp.com/api/auth/login",
      data: {
        email: email,
        password: password
      },
      success: function(res) {
	console.log(res);
        if (res.status == "OK") {
	  console.log("Oke");
          localStorage.setItem('token', res.result);
	  window.location.reload();
        }

	if (res.status == 'FAIL') {
	  console.log("Error!");
	}
      },
      error: function(err) {
        console.log(err);
      },
      dataType: "json"
    });
  } else {
    alert("WOY!")
  }
});

var token = localStorage.getItem('token');

if (token) {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": token
    },
    url: "https://api-auth-training.herokuapp.com/api/users",
    success: function(res) {
      if (res.status == "OK") {
        document.getElementById("c-user").innerHTML = `Hi, ${res.result.name}!`;
      }
    }
  })
}

$('#logoutButton').click(()=> {
  localStorage.removeItem('token');
  window.location.reload();
})

