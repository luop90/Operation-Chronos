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
  console.log('Window loaded');
  menuHooks();
  Chronos.draw();
});
