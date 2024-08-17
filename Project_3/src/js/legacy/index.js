"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var prevButton = document.querySelector(".carousel__prev");
var nextButton = document.querySelector(".carousel__next");
var container = document.querySelector(".carousel__container");
var items = document.querySelectorAll(".carousel__item");
var index = 0;
function updateCarousel() {
  var offset = -index * 33;
  container.style.transform = "translateX(".concat(offset, "%)");
}
prevButton.addEventListener("click", function () {
  if (index > 0) {
    index--;
  } else {
    index = items.length - 1;
  }
  updateCarousel();
});
nextButton.addEventListener("click", function () {
  if (index < items.length - 1) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
});
var footer = document.getElementsByTagName("footer")[0];
footer.addEventListener("click", function () {
  // Select the root element or the specific element where the CSS variable is defined
  var root = document.documentElement;
  var images = _toConsumableArray(document.getElementsByTagName("img"));
  logo_image = images[0];
  banner_image1 = images[1];
  banner_image2 = images[2];
  if (footer.innerHTML == "dark mode") {
    footer.innerHTML = "light mode";
    root.style.setProperty("--text-color", "#ffffff");
    root.style.setProperty("--background-color", "#000000");
    root.style.setProperty("--logo-heading", "#ffa500");
    root.style.setProperty("--nav-link", "#73abf3f2");
    root.style.setProperty("--link-hover", "#00ffff");
    root.style.setProperty("--disabled-color", "#555555");
    logo_image.setAttribute("src", "./assets/logo/only logo dark.JPG");
    banner_image1.setAttribute("src", "./assets/images/welcome-hero/hero-dark.jpg");
    banner_image2.setAttribute("src", "./assets/images/welcome-hero/hero-dark.jpg");
  } else {
    footer.innerHTML = "dark mode";
    root.style.setProperty("--text-color", "#000000");
    root.style.setProperty("--background-color", "#ffffff");
    root.style.setProperty("--logo-heading", "#c06713");
    root.style.setProperty("--nav-link", "#09002b");
    root.style.setProperty("--link-hover", "#575500");
    root.style.setProperty("--disabled-color", "#dfdfdf");
    logo_image.setAttribute("src", "./assets/logo/only logo light.JPG");
    banner_image1.setAttribute("src", "./assets/images/welcome-hero/hero-light.jpg");
    banner_image2.setAttribute("src", "./assets/images/welcome-hero/hero-light.jpg");
  }
});
var mobileMenu = document.getElementsByClassName("nav__items")[0];
var showMenu = document.getElementsByClassName("nav__items--hidden")[0];
var hideMenu = document.getElementsByClassName("nav__items--close")[0];
showMenu.addEventListener("click", function () {
  mobileMenu.style.display = "block";
  showMenu.style.display = "none";
  hideMenu.style.display = "block";
});
hideMenu.addEventListener("click", function () {
  mobileMenu.style.display = "none";
  showMenu.style.display = "block";
  hideMenu.style.display = "none";
});
//# sourceMappingURL=index.js.map
