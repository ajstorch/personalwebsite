

//**** Fix Scrolling of Navbar ****//
var className = "change-color";
var scrollTrigger = 70;

window.onscroll = function() {
  if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
      let navbar = document.querySelector(".navbar")
      navbar.classList.add(className);
  } else {
    let navbar = document.querySelector(".navbar")
    navbar.classList.remove(className);
  }
};
