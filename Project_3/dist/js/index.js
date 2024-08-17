function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r={}.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=Array(t);r<t;r++)o[r]=e[r];return o}var prevButton=document.querySelector(".carousel__prev"),nextButton=document.querySelector(".carousel__next"),container=document.querySelector(".carousel__container"),items=document.querySelectorAll(".carousel__item"),index=0;function updateCarousel(){var e=33*-index;container.style.transform="translateX(".concat(e,"%)")}prevButton.addEventListener("click",function(){0<index?index--:index=items.length-1,updateCarousel()}),nextButton.addEventListener("click",function(){index<items.length-1?index++:index=0,updateCarousel()});var footer=document.getElementsByTagName("footer")[0],mobileMenu=(footer.addEventListener("click",function(){var e=document.documentElement,t=_toConsumableArray(document.getElementsByTagName("img"));logo_image=t[0],banner_image1=t[1],banner_image2=t[2],"dark mode"==footer.innerHTML?(footer.innerHTML="light mode",e.style.setProperty("--text-color","#ffffff"),e.style.setProperty("--background-color","#000000"),e.style.setProperty("--logo-heading","#ffa500"),e.style.setProperty("--nav-link","#73abf3f2"),e.style.setProperty("--link-hover","#00ffff"),e.style.setProperty("--disabled-color","#555555"),logo_image.setAttribute("src","./assets/logo/only logo dark.JPG"),banner_image1.setAttribute("src","./assets/images/welcome-hero/hero-dark.jpg"),banner_image2.setAttribute("src","./assets/images/welcome-hero/hero-dark.jpg")):(footer.innerHTML="dark mode",e.style.setProperty("--text-color","#000000"),e.style.setProperty("--background-color","#ffffff"),e.style.setProperty("--logo-heading","#c06713"),e.style.setProperty("--nav-link","#09002b"),e.style.setProperty("--link-hover","#575500"),e.style.setProperty("--disabled-color","#dfdfdf"),logo_image.setAttribute("src","./assets/logo/only logo light.JPG"),banner_image1.setAttribute("src","./assets/images/welcome-hero/hero-light.jpg"),banner_image2.setAttribute("src","./assets/images/welcome-hero/hero-light.jpg"))}),document.getElementsByClassName("nav__items")[0]),showMenu=document.getElementsByClassName("nav__items--hidden")[0],hideMenu=document.getElementsByClassName("nav__items--close")[0];showMenu.addEventListener("click",function(){mobileMenu.style.display="block",showMenu.style.display="none",hideMenu.style.display="block"}),hideMenu.addEventListener("click",function(){mobileMenu.style.display="none",showMenu.style.display="block",hideMenu.style.display="none"});
//# sourceMappingURL=index.js.map
