import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Header, AvatarInput } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import Input from '../../components/input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ProfileFormData {
  name: string;
  password: string;
  password_confirmation: string;
  old_password: string;
  email: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório Informar o nome'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Obrigatorio informar um e-mail'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required(
              'Informe nova senha para prosseguir com a alteração.',
            ),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Senhas não coiincidem',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // chamada da API

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        addToast({
          title: 'Dados Alterados com sucesso!',
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro ao atualizar o usuário.',
          type: 'error',
          description: 'Houve um erro ao atualizar o usuário',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso.',
          });
        });
      }
    },
    [addToast, updateUser],
  );
  return (
    <Container>
      <Header>
        <Link to="/dashboard">
          <FiArrowLeft size={25} color="#999591" />
        </Link>
      </Header>

      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label>
              <FiCamera size={25} color="#312E38" />
              <input
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
                data-testid="avatar-update"
              />
            </label>
          </AvatarInput>
          <h1>Meu Perfil</h1>
          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome"
            data-testid="name-test"
          />
          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            data-testid="email-test"
          />
          <Input
            containerStyle={{ marginTop: 25 }}
            name="old_password"
            type="password"
            placeholder="Senha Atual"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova Senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            placeholder="Confirmar Senha"
            type="password"
            icon={FiLock}
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
