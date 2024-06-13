import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

//Инициализация tooltip
tippy(".telephone", {
  content: "Позвоните нам!",
  placement: "bottom",
  arrow: true,
  theme: "light",
});
