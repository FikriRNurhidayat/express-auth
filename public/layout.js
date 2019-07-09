var token = localStorage.getItem('token');

$(window).on('load', () => {
  $('#b22').css("display", "none")
  if (token) {
    $('#b22').css("display","");
    $('#b12').css("display","none");
  }
})
