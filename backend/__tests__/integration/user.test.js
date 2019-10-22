import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../src/app';

import User from '../../src/app/models/User';

import authConfig from '../../src/config/auth';

describe('User', () => {
  it('should encrypt user password when new user created', async () => {
    const user = await User.findByPk(1);

    const compare = await user.checkPassword('123456');

    expect(compare).toBe(true);
  });

  it('should validate request to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({});

    expect(response.status).toBe(400);
    expect(response.error.text).toMatch(/Validation fails/);
  });

  it('should be able to register', async () => {
    const user = {
      name: 'New Register',
      email: 'newregister@testjest.com',
      password: '123456',
    };

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: user.name,
      email: user.email,
    });

    await User.destroy({ where: { id: response.body.id } });
  });

  it('should not be able to register with duplicated email', async () => {
    const user1 = await User.create({
      name: 'New Register 1',
      email: 'newregister@testjest.com',
      password: '123456',
    });

    const user2 = {
      name: 'New Register 2',
      email: 'newregister@testjest.com',
      password: '123456',
    };

    const response = await request(app)
      .post('/users')
      .send(user2);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"User already exists","name":"Error"}'
    );

    await user1.destroy();
    await User.destroy({ where: { email: user2.email } });
  });

  it('should not be able access update user if not authenticated', async () => {
    const response = await request(app)
      .put('/users')
      .send({
        name: 'teste de update',
      });

    expect(response.status).toBe(401);
    expect(response.error.text).toBe('{"error":"Token not provided"}');
  });

  it('should validate request to update', async () => {
    const user = await User.create({
      name: 'New Register',
      email: 'newregister@testjest.com',
      password: '123456',
    });
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: '',
        email: '',
      });

    expect(response.status).toBe(400);
    expect(response.error.text).toMatch(/Validation fails/);

    await user.destroy();
  });

  it('should be able to update name or email if authenticated', async () => {
    const user = await User.create({
      name: 'New Register',
      email: 'newregister@testjest.com',
      password: '123456',
    });
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    /*
     * Test name update
     */
    let response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'teste de update',
        email: user.email,
      });

    expect(response.body).toEqual({
      id: user.id,
      name: 'teste de update',
      email: user.email,
    });

    /*
     * Test email update
     */
    response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: user.name,
        email: 'teste_de_update@portugues.com',
      });

    expect(response.body).toEqual({
      id: user.id,
      name: user.name,
      email: 'teste_de_update@portugues.com',
    });

    await user.destroy();
  });

  it('should not be able to update email duplicated', async () => {
    const user1 = await User.create({
      name: 'New Register',
      email: 'teste1@test.com',
      password: '123456',
    });
    const user2 = await User.create({
      name: 'New Register',
      email: 'teste2@test.com',
      password: '123456',
    });
    const token = jwt.sign({ id: user2.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user1.email,
      });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"User already exists","name":"Error"}'
    );

    await user1.destroy();
    await user2.destroy();
  });

  it('should not update password withou oldPassword', async () => {
    const user = await User.create({
      name: 'New register',
      email: 'teste@teste.com',
      password: '123456',
    });
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: '1234567',
        confirmPassword: '1234567',
      });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Password is required","name":"Error"}'
    );

    await user.destroy();
  });

  it('should not update if oldPassword does not match', async () => {
    const user = await User.create({
      name: 'New register',
      email: 'teste@teste.com',
      password: '123456',
    });
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '1234567',
        password: '1234567',
        confirmPassword: '1234567',
      });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Password does not match","name":"Error"}'
    );

    await user.destroy();
  });
});
