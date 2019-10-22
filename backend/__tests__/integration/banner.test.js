import { resolve } from 'path';
import fs from 'fs';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../src/app';

import User from '../../src/app/models/User';
import Banner from '../../src/app/models/Banner';

import authConfig from '../../src/config/auth';

describe('Banner', () => {
  const filePath = resolve(__dirname, '..', 'images', 'chaves.jpeg');

  it('should authenticated user store a banner', async () => {
    const user = await User.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/banners')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', filePath);

    expect(response.body).toEqual({
      createdAt: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      id: expect.any(Number),
      name: 'chaves.jpeg',
      path: expect.stringContaining('.jpeg'),
      updatedAt: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      url: expect.stringContaining('http://'),
    });

    await user.destroy();
    await Banner.destroy({ where: { id: response.body.id } });

    try {
      fs.unlinkSync(
        resolve(__dirname, '..', '..', 'tmp', 'uploads', response.body.path)
      );
    } catch (error) {
      console.log(error);
    }
  });
});
