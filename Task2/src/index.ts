import express from 'express';
import uuidv4 from 'uuid/v4';

import IUser from './i.user';

const app = express();
const port = 3000;

const users: IUser[] = [];

app.listen(port, () => {
  process.stdout.write(`Server running on port ${port}`);
});

app.use(express.json());

// without special packages
const isValidBody = (body: IUser): boolean =>
  body.login &&
  typeof body.login === 'string' &&
  body.password &&
  typeof body.password === 'string' &&
  body.age &&
  typeof body.age === 'number';

const isLoginExist = (login: string, userId: string = ''): boolean =>
  users.some(user => user.login === login && user.id !== userId);

const searchUserIndex = (userId: string): number =>
  users.findIndex(user => user.id === userId);

app.get('/', (req, res) => {
  res.send('Hello!');
});

/*
  URL: /user
  get - получить данные о списке пользователей
  post - добавить пользователя (необходимые поля login/password/age)
*/
app
  .route('/user')
  .get((req, res) => {
    res.send(users);
  })
  .post((req, res) => {
    const body = req.body;

    if (!isValidBody(body)) {
      res.status(400).json({ message: `Request body is not valid` });
      return;
    }

    if (isLoginExist(body.login)) {
      res.status(400).json({ message: 'This user is already exist' });
      return;
    }

    const id = uuidv4();
    const isDeleted = false;
    const { login, password, age } = body;

    users.push({ id, login, password, age, isDeleted });

    res.json({ message: `Success. ID = ${id}` });
  });

/*
  URL: /user/:id
  get - получаем данные о пользователе с ID === id
  put - обновляем данные пользователя
  delete - помечаем пользователя как удален
*/
app
  .route('/user/:id')
  .get((req, res) => {
    const index = searchUserIndex(req.params.id);

    if (index === -1) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }

    res.json(users[index]);
  })
  .put((req, res) => {
    const body = req.body;
    const userId = req.params.id;

    if (!isValidBody(body)) {
      res.status(400).json({ message: 'Request body is not valid' });
      return;
    }

    const index = searchUserIndex(userId);

    if (index === -1) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }

    if (isLoginExist(body.login, userId)) {
      res.status(400).json({ message: 'This login is already used' });
      return;
    }

    if (users[index].isDeleted) {
      res.status(400).json({ message: `User marked as "deleted"` });
      return;
    }

    users[index].login = body.login;
    users[index].password = body.password;
    users[index].age = body.age;

    res.json({ message: 'successfully updated' });
  })
  .delete((req, res) => {
    const index = searchUserIndex(req.params.id);

    if (index === -1) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }

    users[index].isDeleted = true;

    res.json({ message: 'delete' });
  });
