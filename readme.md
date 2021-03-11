# Домашнее задание к занятию Mongo

**Запросы для MongoDB**

- запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

```ts
let data = { title: 'test', description: 'test', authors: 'test' };
db.library.insertMany([data, data]);
```

- запрос для поиска полей документов коллекции books по полю title

```ts
let search = 'test';
db.library.find({ title: new RegExp(search) });
```

- запрос для редактирования полей: description и authors коллекции books по \_id записи

```ts
let data = { description: 'test', authors: 'test' };
let id = 'id';
db.library.updateOne({ _id: id }, { $set: { description, authors } });
```

\*Каждый документ коллекции books должен содержать следующую структуру данных:

```ts
{
  title: string,
  description: string,
  authors: string
}
```

## Приложение доступну по адресу

https://serginij-express-library.herokuapp.com/

## Локальный запуск

`docker-compose up`

## API

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
