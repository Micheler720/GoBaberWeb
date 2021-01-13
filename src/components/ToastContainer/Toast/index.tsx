import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { useToast, ToastMessage } from '../../../hooks/toast';

interface ToastsProps {
  toast: ToastMessage;
  style: object;
}
const icon = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
};

const Toast: React.FC<ToastsProps> = ({ toast, style }) => {
  const { removeToast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [removeToast, toast.id]);

  return (
    <Container
      hashdescrition={Number(!!toast.description)}
      type={toast.type}
      style={style}
      data-testid={toast.id}
    >
      {icon[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => {
          removeToast(toast.id);
        }}
        data-testid="close-toast-item"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
