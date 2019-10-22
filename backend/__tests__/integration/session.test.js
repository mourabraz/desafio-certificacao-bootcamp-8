import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';

describe('Session', () => {
  it('should validate request to signIn', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({});

    expect(response.status).toBe(400);
    expect(response.error.text).toMatch(/Validation fails/);
  });

  it('should return token if authenticate', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return error invalid token in authenticated route with a bad formatted token', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', 'Bearer testedetoken')
      .send({
        name: 'nome',
        email: 'email@email.com',
      });

    expect(response.status).toBe(401);
    expect(response.error.text).toMatch(/Token invalid/);
  });
});
