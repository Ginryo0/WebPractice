import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import classes from './auth-form.module.css';
import { useRouter } from 'next/router';

async function createUser(email, password) {
  const res = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'smth went wrong');
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const emailRef = useRef();
  const pwRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPw = pwRef.current.value;

    if (isLogin) {
      // log user in

      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPw,
      });

      if (!result.error) {
        router.replace('/profile');
      }

      console.log(result);
    } else {
      try {
        const res = await createUser(enteredEmail, enteredPw);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={pwRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
