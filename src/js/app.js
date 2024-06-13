import bootstrap from "bootstrap";

//Анимация для бургер меню
import "./modules/header-nav.js";

//Двигающаяся шапка
import "./modules/moving-header.js";

//Инициализия tippy
import "./modules/tippy-ini.js";

//Плавный скролл до anchor
import "./modules/smooth-anchors.js";

//Инициализация маски ввода
import "./modules/mask-ini.js";

//Отправка данных с формы
import "./modules/form-send.js";

// Валидация форм bootstrap
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//Инициализация Fancybox
import "./modules/fancy-ini.js";

//Инициализация swiper
import "./modules/swiper-ini.js";
