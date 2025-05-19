Области хранения данных:

- база данных на json-server
- BFF
- redux store

Сущности приложения:

- ползователь:БД (список пользователей), BFF (сессия текущего), store (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), store (использование на клиенте)
- статья: БД (список статей), store (отображение в браузере)
- комментарий: БД (список комментариев), store (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registred_at / role_id
- роли - roes: id / name
- статьи - posts: id / image_url / content / published_at
- комментарии - comments: id / author_id / podt_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте):

- user: id / login / roleId
- posts: массив post: id / title / imageUrl / publishedAt / comentsCount
- post: id / title / imageUrl / content / publishedAt / coments: массив coment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role
