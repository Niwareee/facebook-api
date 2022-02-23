import * as request from 'superagent';

let id: number;
let token = '';

describe('/api/v1/posts', () => {
  beforeAll(async () => {
    const email = 'test@email.com';
    const password = 'password';

    const { body } = await request
      .post('http://localhost:3000/api/v1/authentication/login')
      .send({ email, password });

    token = body.token;
  });

  test('[POST] /', async () => {
    const message = 'Hello World';

    const { status, body } = await request
      .post('http://localhost:3000/api/v1/posts')
      .set('Authorization', token)
      .send({ message });

    expect(status).toEqual(201);
    expect(body).toEqual(
      expect.objectContaining({
        post: {
          id: expect.any(String),
          message,
          authorId: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        },
      }),
    );

    id = body.post.id;
  });

  test('[GET] /', async () => {
    const { status, body } = await request
      .get('http://localhost:3000/api/v1/posts')
      .set('Authorization', token);

    expect(status).toEqual(200);
    expect(body).toEqual({
      posts: expect.arrayContaining(
        expect.objectContaining({
          id: expect.any(Number),
          message: expect.any(String),
          authorId: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        }),
      ),
    });
  });

  test('[GET] /:id', async () => {
    const { status, body } = await request
      .get(`http://localhost:3000/api/v1/posts/${id}`)
      .set('Authorization', token);

    expect(status).toEqual(200);
    expect(body).toEqual({
      posts: expect.arrayContaining(
        expect.objectContaining({
          id,
          message: 'Hello World',
          authorId: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        }),
      ),
    });
  });

  test('[PATCH] /:id', async () => {
    const message = 'UPDATED Hello World';
    const { status, body } = await request
      .patch(`http://localhost:3000/api/v1/posts/${id}`)
      .set('Authorization', token)
      .send({ message });

    expect(status).toEqual(200);
    expect(body).toEqual({
      post: expect.objectContaining({
        id,
        message,
        authorId: expect.any(String),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      }),
    });
  });

  test('[DELETE] /:id', async () => {
    const { status } = await request
      .delete(`http://localhost:3000/api/v1/posts/${id}`)
      .set('Authorization', token);

    expect(status).toEqual(204);
  });
});
