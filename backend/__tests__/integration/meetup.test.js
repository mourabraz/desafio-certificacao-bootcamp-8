import { resolve } from 'path';
import fs from 'fs';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { addDays, subDays, format } from 'date-fns';

import app from '../../src/app';

import User from '../../src/app/models/User';
import Meetup from '../../src/app/models/Meetup';
import Banner from '../../src/app/models/Banner';

import authConfig from '../../src/config/auth';

describe('Meetup', () => {
  it('should authenticated user get his own meetups', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get('/meetups/user')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.length).toEqual(16);
  });

  it('should validate store meetup request', async () => {
    const meetup = {
      title: '',
      dscription: '',
      localization: '',
      date: '',
      banner_id: '',
    };

    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.status).toBe(400);
    expect(response.error.text).toMatch(/Validation fails/);
  });

  it('should store meetup request', async () => {
    const filePath = resolve(__dirname, '..', 'images', 'chaves.jpeg');
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const responseBanner = await request(app)
      .post('/banners')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', filePath);

    const meetup = {
      title: 'teste',
      description: 'teste',
      localization: 'teste',
      date: addDays(new Date(), 1),
      banner_id: responseBanner.body.id,
    };

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.body).toEqual({
      past: false,
      id: expect.any(Number),
      user_id: user.id,
      title: 'teste',
      description: 'teste',
      localization: 'teste',
      date: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      banner_id: responseBanner.body.id,
      updatedAt: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      createdAt: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
    });

    await Banner.destroy({ where: { id: responseBanner.body.id } });
    await Meetup.destroy({ where: { id: response.body.id } });

    try {
      fs.unlinkSync(
        resolve(
          __dirname,
          '..',
          '..',
          'tmp',
          'uploads',
          responseBanner.body.path
        )
      );
    } catch (error) {
      console.log(error);
    }
  });

  it('should not store meetup with banner in use', async () => {
    const meetup = {
      title: 'teste',
      description: 'teste',
      localization: 'teste',
      date: addDays(new Date(), 1),
      banner_id: 1,
    };

    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Banner is already in use","name":"Error"}'
    );
  });

  it('should not store meetup with banner not found', async () => {
    const meetup = {
      title: 'teste',
      description: 'teste',
      localization: 'teste',
      date: addDays(new Date(), 1),
      banner_id: 100,
    };

    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Banner id is not found","name":"Error"}'
    );
  });

  it('should not store meetup with past dates', async () => {
    const meetup = {
      title: 'teste',
      description: 'teste',
      localization: 'teste',
      date: subDays(new Date(), 1),
      banner_id: 1,
    };

    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Past dates are not permitted","name":"Error"}'
    );
  });

  it('should update future meetups where authenticated user is its owner', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const banner = await Banner.create({
      name: 'teste.png',
      path: 'teste.png',
    });

    const meetup = await Meetup.create({
      title: 'teste',
      description: 'teste',
      localization: 'teste',
      date: addDays(new Date(), 1),
      banner_id: banner.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put(`/meetups/${meetup.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'teste atualizado',
      });

    expect(response.body).toMatchObject({
      past: false,
      id: expect.any(Number),
      user_id: user.id,
      title: 'teste atualizado',
      description: 'teste',
      localization: 'teste',
      date: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      banner_id: banner.id,
      updatedAt: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      createdAt: expect.stringMatching(
        /[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z/
      ),
      banner: expect.objectContaining({
        name: expect.any(String),
        path: expect.any(String),
        url: expect.any(String),
      }),
    });

    await banner.destroy();
    await meetup.destroy();
  });

  it('should not update not found meetup', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put(`/meetups/100`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'teste atualizado',
      });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Meetup not found","name":"Error"}'
    );
  });

  it('should not update meetup if authenticated user is not its owner', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/meetups/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'teste atualizado',
      });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Request not permitted","name":"Error"}'
    );
  });

  it('should not update past meetup', async () => {
    const user = await User.findByPk(1);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/meetups/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'teste atualizado',
      });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Update past meetups is not allowed","name":"Error"}'
    );
  });

  it('should not update meetup with banner not found', async () => {
    const meetup = await Meetup.findByPk(18);

    const user = await User.findByPk(meetup.user_id);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put(`/meetups/${meetup.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ banner_id: 100 });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Banner is not found","name":"Error"}'
    );
  });

  it('should not update meetup with banner already in use', async () => {
    const meetup = await Meetup.findByPk(18);

    const user = await User.findByPk(meetup.user_id);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put(`/meetups/${meetup.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ banner_id: 2 });

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Banner is already in use","name":"Error"}'
    );
  });

  it('should not delete meetup not found', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .delete('/meetups/100')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Meetup not found","name":"Error"}'
    );
  });

  it('should not delete meetup if authenticated user is not its owner', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .delete('/meetups/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Request not permitted","name":"Error"}'
    );
  });

  it('should not delete past meetup', async () => {
    const user = await User.findByPk(1);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .delete('/meetups/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe(
      '{"message":"Delete a past meetup is not allowed","name":"Error"}'
    );
  });

  it('should delete a meetup', async () => {
    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .delete('/meetups/18')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      deletedRows: expect.any(Number),
    });
  });

  it('should list meetups by date and by page', async () => {
    const today = new Date();

    const user = await User.findByPk(2);
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get(`/meetups?date=${format(today, 'yyyy-MM-dd')}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.length).toEqual(10);
  });
});
