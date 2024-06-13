let tempScrollTop;
let currentScrollTop = window.pageYOffset;

window.addEventListener("scroll", function () {
  currentScrollTop = window.pageYOffset;

  if (currentScrollTop > document.querySelector("header").offsetHeight) {
    document.body.classList.add("fixed-header");
    if (tempScrollTop > currentScrollTop) {
      document.querySelector("header").classList.add("show");
    } else {
      document.querySelector("header").classList.remove("show");
    }
  } else {
    document.body.classList.remove("fixed-header");
    document.querySelector("header").classList.remove("show");
  }

  tempScrollTop = currentScrollTop;
});
