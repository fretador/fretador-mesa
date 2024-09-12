import React, { useState } from 'react';
import styles from './RecoverPasswordForm.module.css';
import { CheckIcon } from '@/utils/icons';
import Loading from '../Loading';

const RecoverPasswordForm = () => {

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
  }, 1000);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Digite seu e-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {isEmailValid && <CheckIcon className={styles.checkIcon} />}
      </div>

      <div className={styles.buttonSubmitContainer}>
        <button
          className={styles.buttonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? null : 'Enviar'}
        </button>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Loading />
          </div>
        )}
      </div>
    </form>
  )
}

export default RecoverPasswordForm