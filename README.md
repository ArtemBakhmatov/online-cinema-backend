.env:
  NODE_ENV = development; // режим разработки
  MONGO_URI = mongodb://127.0.0.1:27017/online-cinema-fullstack; // путь к базе данных
  JWT_SECRET = здесь рандомные числа;

в папке src создали папку config (тут будем хранить все конфиги для каких либо операции, например
конфиг телеграмма , конфиг jwt, и конфиг mongodb)

установка зависимостей:
1. npm i @nestjs/config
2. npm i @typegoose/typegoose 
3. npm i mongoose   // для работы с БД (с ним проще работать с MongoDB)
4. npm i --legacy-peer-deps nestjs-typegoose
5. npm i -D @types/mongoose --legacy-peer-deps
6. npm i @nestjs/jwt --legacy-peer-deps


можем создать папку auth через командную строку, то есть генерируем: nest g module auth
nest g s auth -> создали файл service.ts в auth 
nest g controller auth -> создали файл controller.ts в auth

папка DTO -> data transit object (описание входных данных)
папка strategies -> стратегия авторизации
папка decorations -> помогает получать текущего авторизованного юзера
папка guards -> для защиты наших энпоинтов (например один энпоин для юзера, другой для админа другой для всех)
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
