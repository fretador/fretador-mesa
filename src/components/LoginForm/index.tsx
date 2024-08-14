import React, { useState } from 'react';
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.inputContainer}>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="password"
          id="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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

      <div className={styles.buttonSubmitContainer}>
        <button className={styles.buttonSubmit} type="submit">Entrar</button>
      </div>

    </form>
  );
};

export default LoginForm;
