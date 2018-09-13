function toggle_menu(el){
  const target = el.dataset.target;
  const $target = document.getElementById(target);

  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  el.classList.toggle('is-active');
  $target.classList.toggle('is-active');
}
window.toggle_menu = toggle_menu