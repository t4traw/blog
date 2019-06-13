function toggle_menu(el){
  const target = el.dataset.target;
  const menu = document.getElementById(target);

  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  el.classList.toggle('is-active');
  menu.classList.toggle('is-active');
}
window.toggle_menu = toggle_menu