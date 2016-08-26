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
  resizeCanvas();
});

function menuHooks() {
  var menu = document.getElementsByClassName('popupMenu')[0];
  var menuBtn = document.querySelector('aside.menu > a');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  menuBtn.onclick = function () {
    menu.style.visibility = 'visible';
  };

  canvas.onclick = function () {
    if (menu.style.visibility == 'visible') {
      menu.style.visibility = 'hidden';

      Chronos.ledOnColor = document.querySelector('input[name="onColor"]').value;
      Chronos.ledOffColor = document.querySelector('input[name="offColor"]').value;
      Chronos.backgroundColor = document.querySelector('input[name="backgroundColor"]').value;

      Chronos.draw();

      Chronos.saveSettings();
    }
  };

  resizeCanvas();

  document.querySelector('input[name="onColor"]').value = Chronos.ledOnColor;
  document.querySelector('input[name="offColor"]').value = Chronos.ledOffColor;
  document.querySelector('input[name="backgroundColor"]').value = Chronos.backgroundColor;
}

function resizeCanvas() {
  var diameter = Math.min(window.innerWidth - 4, window.innerHeight - 6);
  var canvas = document.querySelector('canvas');

  canvas.setAttribute('width', diameter);
  canvas.setAttribute('height', diameter);

  Chronos.draw();
}
