const prevButton = document.querySelector(".carousel__prev");
const nextButton = document.querySelector(".carousel__next");
const container = document.querySelector(".carousel__container");
const items = document.querySelectorAll(".carousel__item");

let index = 0;

function updateCarousel() {
	const offset = -index * 33;
	container.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener("click", () => {
	if (index > 0) {
		index--;
	} else {
		index = items.length - 1;
	}
	updateCarousel();
});

nextButton.addEventListener("click", () => {
	if (index < items.length - 1) {
		index++;
	} else {
		index = 0;
	}
	updateCarousel();
});

let footer = document.getElementsByTagName("footer")[0];

footer.addEventListener("click", () => {
	// Select the root element or the specific element where the CSS variable is defined
	const root = document.documentElement;
	const images = [...document.getElementsByTagName("img")];
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

const mobileMenu = document.getElementsByClassName("nav__items")[0];
const showMenu = document.getElementsByClassName("nav__items--hidden")[0];
const hideMenu = document.getElementsByClassName("nav__items--close")[0];

showMenu.addEventListener("click", () => {
	mobileMenu.style.display = "block";
	showMenu.style.display = "none";
	hideMenu.style.display = "block";
});

hideMenu.addEventListener("click", () => {
	mobileMenu.style.display = "none";
	showMenu.style.display = "block";
	hideMenu.style.display = "none";
});
