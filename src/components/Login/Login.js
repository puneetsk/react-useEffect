import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {

  if(action.type === 'Entered_Email') {
    return {
      value: action.val,
      isValue: action.val.includes('@')
    }
  }

  if(action.type === 'Email_Blur') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    };
  }

  return {
    value: '',
    isValid: false
  };
}

const passwordReducer = (state, action) => {

    if(action.type === 'USER_PASS') {
      return {
        value: action.val,
        isValid: action.val.trim().length > 6
      }
    }

    if(action.type === 'PASS_BLUR') {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6
      }
    }

    return {
      value: state.value,
      isValid: false
    }
}



const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPass] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });


  const {isValid: emailIsValid } = emailState;
  const {isValid: passIsValid } = passwordState;

  useEffect(() => {
    const formValidity = setTimeout(() => {
      setFormIsValid(emailIsValid && passIsValid)
    }, 500)
    
    return () => {
      clearTimeout(formValidity)
    }
  }, [emailIsValid, passIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail( {
      type: 'Entered_Email',
      val: event.target.value
    })

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({
      type: 'USER_PASS',
      val: event.target.value
    })

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {

    dispatchEmail( {
      type: 'Email_Blur'
    })
  };

  const validatePasswordHandler = () => {
    dispatchEmail( {
      type: 'PASS_BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
