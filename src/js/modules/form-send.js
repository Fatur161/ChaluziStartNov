document.querySelector("#mainForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Предотвращаем стандартную отправку формы

  let formData = new FormData(this); // Создаем объект FormData из данных формы
  let form = this;
  if (form.checkValidity()) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/send-to-server.php"); // Указываем метод и путь к обработчику
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        alert("Ваша заявка отправлена, в скором времени мы с вами свяжемся");
      } else {
        alert("Упс, что-то пошло не так");
      }
    };
    xhr.send(formData); // Отправляем данные формы
  } else {
    e.stopPropagation();
    form.classList.add("was-validated");
  }
});
