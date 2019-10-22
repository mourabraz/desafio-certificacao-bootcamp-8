import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um e-mail válido'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .required(
            'A nova senha é obrigatória, quando inserida a senha antiga'
          )
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required(
            'A confirmação de senha é obrigatória quando a nova senha é inserida'
          )
          .oneOf(
            [Yup.ref('password')],
            'A confirmação de senha não confere com a nova senha!'
          )
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();

  const [oldPasswordInputFilled, setOldPasswordInputFilled] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleIpuntOldPasswordChange(e) {
    if (e.target.value.trim().length) {
      setOldPasswordInputFilled(true);
    } else {
      setOldPasswordInputFilled(false);
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="E-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Senha atual"
          onChange={handleIpuntOldPasswordChange}
        />
        <Input
          disabled={oldPasswordInputFilled ? 0 : 1}
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Nova senha"
        />
        <Input
          disabled={oldPasswordInputFilled ? 0 : 1}
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          <MdAddCircleOutline color="#fff" size={14} /> Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
