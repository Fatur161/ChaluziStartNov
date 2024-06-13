<?php


//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "";

//Сюда вставляем chat_id
$chat_id = "";

//Определяем переменные для передачи данных из нашей формы
    $name = ($_POST['name']);
    $phone = ($_POST['tel']);
    $mess = ($_POST['message-text']);

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Телефон:' => $phone,
        'Сообщение:' => $mess
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
    $to = "danil_semenov18@mail.ru"; // емайл получателя данных из формы
    $tema = "Новая заявка с сайта"; // тема полученного емайла
    $headers = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
    mail($to, $tema, $arr, $headers); //отправляет получателю на емайл значения переменных



    // header("location:javascript://history.go(-1)");
//Выводим сообщение об успешной отправке
    // if ($sendToTelegram) {
    //     alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    // }

//А здесь сообщение об ошибке при отправке
    // else {
    //     alert('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
    // }


?>
