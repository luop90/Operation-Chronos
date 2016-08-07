function menuHooks() {
  var menu = document.getElementsByClassName('popupMenu')[0];
  var menuBtn = document.querySelector('aside.menu > a');

  menuBtn.onmouseover = function () {
    menu.style.visibility = 'visible';
  }

  menuBtn.onmouseout = function () {
    menu.style.visibility = 'hidden';
  }
}

window.addEventListener('load', function () {
  menuHooks();
});
