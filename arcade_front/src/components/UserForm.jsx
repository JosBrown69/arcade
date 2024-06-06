import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login, registrar } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export function UserForm({ route }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [message, setMessage] = useState('') 

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        if (route === 'login') {
            try {
                const res = await login(data);
                console.log(res);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                //console.log(res);
                navigate('/');
                location.reload()
            } catch (errors) {
                console.log(errors);
            }
        } else if (route === 'register') {
            try {
                const res = await registrar(data);
                console.log(res);
                navigate('/login/');
            } catch (errors) {
                if (
                    String(errors.request.response) ===
                    '{"username":["A user with that username already exists."]}'
                ) {
                    setMessage('Username Already exists!');
                }
            }
        } else {
            navigate('/');
        }
    });

    return (
        <div>
            {route === 'login' ? <h2>Login</h2> : <h2>Register</h2>}
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    id='username'
                    name='username'
                    placeholder='Username'
                    {...register('username', { required: true })}
                />
                {errors.username && <span>Title is required</span>}
                {route === 'register' && (
                    <div>
                        <input
                            type='radio'
                            value='male'
                            {...register('gender', { required: true })}
                        />
                        <label htmlFor='male'>Male</label>
                        <input
                            type='radio'
                            value='female'
                            {...register('gender', { required: true })}
                        />
                        <label htmlFor='female'>Female</label>
                        <input
                            type='radio'
                            value='philipino'
                            {...register('gender', { required: true })}
                        />
                        <label htmlFor='philipino'>Philipino</label>
                        {errors.gender && <span>Gender is required</span>}
                    </div>
                )}
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    {...register('password', { required: true })}
                />
                {errors.password && <span>Password is required</span>}
                {route === 'login' ? <button>Login</button> : <button>Register</button>}
                <h2>{message}</h2>
            </form>
        </div>
    );
}
