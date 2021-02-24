# Домашнее задание к занятию «2.3 Ejs»

## Приложение доступну по адресу

https://serginij-express-library.herokuapp.com/

Приложение для работы с сущностью _«книга»_. Каждый экземпляр книги должен содержать следующую структуру данных:

```typescript
{
  id: string,
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileName: string,
  fileBook: string
}
```

Дефолтные переменные находятся в конфигурационном файле `.env.example`

**Команда запуска**

`npm start`

## Методы

Формат данных в body - **JSON**

**POST `/api/books/create` | `/api/books/update/:id`**

_form-data_

```typescript
{
  id: string,
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileBook: File `.pdf or .txt`
}
```

| метод  | url                       | действие                                    | комментарий                                                                                 |
| ------ | ------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `POST` | `/api/user/login`         | авторизация пользователя                    | метод всегда возвращает **Code: 201** и статичный объект: `{ id: 1, mail: "test@mail.ru" }` |
| `GET`  | `/api/books`              | получить все книги                          | получаем массив всех книг                                                                   |
| `GET`  | `/api/books/:id`          | получить книгу по **id**                    | получаем объект книги, если запись не найдено вернем **Code: 404**                          |
| `POST` | `/api/books/create`       | _(form-data)_ создать книгу                 | создаем книги и возврашаем ее же вместе с присвоенным **id**                                |
| `POST` | `/api/books/update/:id`   | _(form-data)_ редактировать книгу по **id** | редактируем объект книги, если запись не найдено вернем **Code: 404**                       |
| `POST` | `/api/books/delete/:id`   | удалить книгу по **id**                     | удаляем книгу и возвращаем ответ: **'ok'**                                                  |
| `GET`  | `/api/books/:id/download` | скачать файл с книгой по **id** книги       | скачивается файл в формате **.pdf** или **.txt**                                            |
