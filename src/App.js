import logo from './logo.svg';
import './App.css';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
function App() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  //input 안의 name으로 지어준 변수명을 넣어주면 input안의 값을 관찰함. register 필수
  //기존 ref={register} 에서 {...register('변수명')}으로 바뀜
  //유효성 검사가 필요할 경우 {...register('변수명',{조건})} 형식으로 작성

  console.log(watch('email'));
  const password = useRef();
  password.current = watch('password');

  // input에 입력한 데이터가 들어옴
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {/* 유효성 체크에서 걸렸을 경우 띄울 에러메시지 */}
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input {...register('name', { required: true, maxLength: 10 })} />
        {/* //유효성 체크 조건이 1개 이상일 경우 각각의 조건을 따로 줄 수 있음*/}
        {errors.name && errors.name.type === 'required' && (
          <p>This Name field is required</p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p>Your input exceed maximum length</p>
        )}
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>This Name field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at least 6 characters</p>
        )}
        <label>Password Confirm</label>
        <input
          type="password"
          {...register('password_confirm', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'required' && (
            <p>This Name field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === 'validate' && (
            <p>The password do not match</p>
          )}
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
