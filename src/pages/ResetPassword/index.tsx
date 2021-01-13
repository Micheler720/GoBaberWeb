import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/input';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Background } from '../SignIn/styles';
import { Container, Content, AnimationContent } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation();
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Obrigatório informar a senha. '),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação de senha inválida.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { password, password_confirmation } = data;

        const token = location.search.replace('?token=', '');

        if (!token || token === '') {
          throw new Error();
        }
        await api.post('/password/reset', {
          password_confirmation,
          password,
          token,
        });
        addToast({
          title: 'Senha resetada com sucesso.',
          type: 'success',
          description: 'Sua senha foi resetada com sucesso!',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Não foi possível recuperar sua senha',
          description:
            'Não foi possível recuperar a senha, verifique os dados informados.',
          type: 'error',
        });
      }
    },
    [addToast, history, location],
  );
  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logo} alt="GoBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Recupere sua senha</h1>
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirme sua Senha"
            />
            <Button type="submit">Resetar a senha</Button>
          </Form>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
