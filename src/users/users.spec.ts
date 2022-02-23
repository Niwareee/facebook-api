import * as request from 'superagent';

let userId = '';
let token = '';

describe('/api/v1/users', () => {
  beforeAll(async () => {
    const email = 'test@email.com';
    const password = 'password';

    const { body } = await request
      .post('http://localhost:3000/api/v1/authentication/login')
      .send({ email, password });

    userId = body.user.id;
    token = body.token;
  });

  test('[PATCH] /:id/profile', async () => {
    const firstName = 'Dylan';
    const lastName = 'DE SOUSA';

    const { status, body } = await request
      .patch(`http://localhost:3000/api/v1/users/${userId}/profile`)
      .set('Authorization', token)
      .send({ firstName, lastName });

    expect(status).toEqual(200);
    expect(body).toEqual({
      profile: {
        firstName,
        lastName,
      },
    });
  });

  test('[GET] /:id/profile', async () => {
    const { status, body } = await request
      .get(`http://localhost:3000/api/v1/users/${userId}/profile`)
      .set('Authorization', token);

    expect(status).toEqual(200);
    expect(body).toEqual({
      profile: {
        firstName: 'Dylan',
        lastName: 'DE SOUSA',
      },
    });
  });

  test('[GET] /:id/posts', async () => {
    const { status, body } = await request
      .get(`http://localhost:3000/api/v1/users/${userId}/posts`)
      .set('Authorization', token);

    expect(status).toEqual(200);
    expect(body).toEqual({
      posts: expect.arrayContaining(expect.objectContaining({})),
    });
  });
});
