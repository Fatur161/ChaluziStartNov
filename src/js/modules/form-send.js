document.querySelector("#mainForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Предотвращаем стандартную отправку формы

  if (!this.submitBlocked || !this.submitTimer) {
    // Проверяем, не заблокирована ли отправка
    this.submitBlocked = true; // Блокируем повторные отправки

    let formData = new FormData(this); // Создаем объект FormData из данных формы
    let form = this;
    if (form.checkValidity()) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", WPJS.siteUrl + "/assets/php/send_to_server.php"); // Указываем метод и путь к обработчику
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            alert(
              "Ваша заявка отправлена, в скором времени мы с вами свяжемся"
            );
          } else {
            alert("Упс, что-то пошло не так");
          }
          clearTimeout(form.submitTimer); // Очищаем таймер
          form.submitTimer = null; // Обнуляем таймер
          form.submitBlocked = false; // Разрешаем повторные отправки
        }
      };
      xhr.send(formData); // Отправляем данные формы

      // Установка таймера для разрешения повторных отправок через 2 секунды
      this.submitTimer = setTimeout(() => {
        this.submitBlocked = false;
      }, 2000);
    }
  } else {
    alert("Подождите 2 секунды перед новой отправкой");
  }
});
