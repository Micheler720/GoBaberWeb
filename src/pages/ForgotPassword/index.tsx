import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Content, AnimationContent, Background } from './styles';
import Input from '../../components/input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ForgotFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: ForgotFormData) => {
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          title: 'Envio de e-mail para recuperação de senha.',
          description:
            'Enviamos um e-mail para recuperação de senha, cheque sua caixa de entrada.',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          title: 'Erro ao realizar recuperação de senha',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input name="email" icon={FiUser} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para o Login
          </Link>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
