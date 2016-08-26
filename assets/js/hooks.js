function menuHooks() {
  var menu = document.getElementsByClassName('popupMenu')[0];
  var menuBtn = document.querySelector('aside.menu > a');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  menuBtn.onclick = function () {
    menu.style.visibility = (menu.style.visibility == 'hidden' || menu.style.visibility == '') ? 'visible' : 'hidden';
  };

  canvas.onclick = function () {
    if (menu.style.visibility == 'visible') {
      menu.style.visibility = 'hidden';
    }
  };
}

window.addEventListener('load', function () {
  menuHooks();
  Chronos.draw();

  setTimeout(function () {
    Chronos.currentTime = moment();
    Chronos.draw();

    setInterval(function () {
      Chronos.currentTime = moment();
      Chronos.draw();
    }, 1000);
  }, 1000 - moment().millisecond()); // Correction for time offset
});

window.addEventListener('resize', function () {
  var diameter = Math.min(window.innerWidth, window.innerHeight);
  var canvas = document.querySelector('canvas');

  canvas.setAttribute('width', diameter);
  canvas.setAttribute('height', diameter);

  Chronos.draw();
});
