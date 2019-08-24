function changeIcon() {
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = '/favicon.ico';
  document.title = "Documentation";
  document.getElementsByTagName('head')[0].appendChild(link);
};

changeIcon();
