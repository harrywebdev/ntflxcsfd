function ncInit(onload) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = '//code.jquery.com/jquery-3.5.1.min.js';
  script.onload = onload;
  head.appendChild(script);
}

function injectRating() {
  var movies = $('.fallback-text');

  // TODO: run through these, ask API with the .innerHTML as search term
  // and amend the rating to .parent().parent() with some pos-a and high zidx
}

ncInit(injectRating);
