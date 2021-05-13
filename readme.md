## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

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

## Module Architecture

Рутовая директория для доменов (модули: Books, Main, User) - `libs`

Опционально можно сложить `service`, `networking`, `store`, .... рядом без создания вложенных директорий

```
libs/
  book/
    core/ Различные файлы, модули, чистые, без деталей, Injectable
      book.service.ts - обработка логики, без валидации
    networking/ Сервисы, которые инкапсулируют запросы
      book.networking.ts -- Внутри набор методов, которые дергают httpModul (запросы к микросервисам, сторонним api)
    store/
      book.store.ts -- работа с базами, другими хранилищами данных
    routes (controllers)/ -- Обработчки http (и не только) запросов
      book.controller.ts -- Валидация (например, с помощью DTO)
    dto/
      book.dto.ts
    interfaces/
      book.interfaces.ts
    models/
      book.model.ts
    book.module.ts
  main/
  user/
```
