## 1. Реализовать форму обратной связи со следующими полями:
> 1.1. Имя, фамилия.\
> 1.2. E-mail.\
> 1.3. Номер телефона (с маской российского номера).\
> 1.4. Дата рождения.\
> 1.5. Сообщение.

## 2. Требования к форме:
> 2.1. Валидация:
>> 2.1.1. Поле “Имя, фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита. Минимальная длина каждого слова 3 символа, максимальная 30. Между словами может быть только 1 пробел. При вводе символы должны приводиться в верхний регистр.\
>> 2.1.2. E-mail должен быть корректным (должна быть отключена браузерная валидация).\
>> 2.1.3. Для номера телефона использовать маску Российского номера.\
>> 2.1.4. Дата рождения вводится через календарь.\
> 2.1.5. Поле “Сообщение” имеет минимальную длину в 10 символов и максимальную в 300.

> 2.2. Отправка формы:
>> 2.2.1. Отправка происходит ajax запросом на сервер. В ответе должен прийти json с 2-мя возможными статусами: error/success и текстом ошибки/”успешной отправки”. Ответ необходимо обработать на UI и вывести соответствующее сообщение под формой.\
>> 2.2.2. Пока не пришел ответ с сервера, форму нельзя отправить повторно.\
>> 2.2.3. В случае успешного ответа с сервера, очистить все поля формы.

## 3. Комментарии:
> 3.1. Вся валидация должны быть написана самостоятельно, без использования сторонних библиотек.\
3.2. Поля формы необходимо валидировать во время ввода и перед отправкой на сервер.\
3.3. Если поле не проходит валидацию, выводить соответствующее сообщение под полем.

![Image alt](https://github.com/olennikovandrey/form-validate/raw/main/src/assets/images/form-demo.png)
