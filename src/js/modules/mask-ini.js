import IMask from "imask";

// Инициализация масски ввода номера телефона
const element = document.getElementById("tel");
const maskOptions = {
  mask: "+{7(}000)000-00-00",
};
const mask = IMask(element, maskOptions);
