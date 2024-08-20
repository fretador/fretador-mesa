import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthController } from '@/controllers/authController';
import styles from './LoginForm.module.css';
import { CheckIcon, EyeIcon, HideEyeIcon } from '@/utils/icons';
import Loading from '../Loading';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthController();
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);

      // Redireciona para a página inicial ou uma página protegida
      router.push('/home');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.inputContainer}>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          // onChange={(e) => setEmail(e.target.value)}
          onChange={handleEmailChange}
          required
        />
        {isEmailValid && <CheckIcon className={styles.checkIcon} />}
      </div>
      <div className={styles.inputContainer}>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          onClick={togglePasswordVisibility}
          className={styles.passwordToggleIcon}
        >
          {isPasswordVisible ? <EyeIcon /> : <HideEyeIcon />}
        </span>
      </div>

      <div className={styles.optionsUnderForms}>
        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Manter conectado
          </label>
        </div>

        <div className={styles.forgotPasswordContainer}>
          <a href="">Esqueci a senha</a>
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.buttonSubmitContainer}>
        <button
          className={styles.buttonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? null : 'Entrar'}
        </button>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Loading />
          </div>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
