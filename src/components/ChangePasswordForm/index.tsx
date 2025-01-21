import React, { useState } from 'react';
import styles from './ChangePasswordForm.module.css';
import { CheckIcon, EyeIcon, HideEyeIcon } from '@/utils/icons';
import Loading from '../Loading';

const ChangePasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setIsPasswordValid(validatePassword(passwordValue));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError('Sua senha deve conter no mínimo 8 caracteres, incluindo letras, números e caracteres especiais.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      console.log('Senha alterada com sucesso!');
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.changePasswordForm}>
      <div className={styles.inputContainer}>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          placeholder="Nova senha"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className={styles.passwordToggleIcon}
        >
          {isPasswordVisible ? <EyeIcon /> : <HideEyeIcon />}
        </span>
        {isPasswordValid && <CheckIcon className={styles.checkIcon} />}
      </div>

      <div className={styles.inputContainer}>
        <input
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          id="confirmPassword"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span
          onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          className={styles.passwordToggleIcon}
        >
          {isConfirmPasswordVisible ? <EyeIcon /> : <HideEyeIcon />}
        </span>
      </div>

      <p className={error ? styles.errorMessage : styles.infoMessage}>
        {error || 'Sua senha deve conter no mínimo 8 caracteres, incluindo letras, números e caracteres especiais.'}
      </p>

      <div className={styles.buttonSubmitContainer}>
        <button
          className={styles.buttonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? null : 'Salvar'}
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

export default ChangePasswordForm;
