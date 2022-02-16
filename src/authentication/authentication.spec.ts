import * as request from 'superagent';

describe('/api/v1/authentication', () => {
  test('/register', async () => {
    const email = 'test@email.com';
    const password = 'password';

    const { status, body } = await request
      .post('http://localhost:3000/api/v1/authentication/register')
      .send({ email, password });

    expect(status).toEqual(201);
    expect(body).toEqual(
      expect.objectContaining({
        user: {
          id: expect.any(String),
          email,
          password,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        },
      }),
    );
  });

  test('/login', async () => {
    const email = 'test@email.com';
    const password = 'password';

    const { body, status } = await request
      .post('http://localhost:3000/api/v1/authentication/login')
      .send({ email, password });

    expect(status).toEqual(200);
    expect(body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          email,
          password,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        },
      }),
    );
  });
});
