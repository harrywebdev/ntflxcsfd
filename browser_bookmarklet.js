function ncInit(onload) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = '//code.jquery.com/jquery-3.5.1.min.js';
  script.onload = onload;
  head.appendChild(script);
}

function injectRating() {
  console.log('ready');
}

ncInit(injectRating);
