import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { login, registrar } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { GoodButton } from './Buttons';
import {
    Input,
    Stack,
    Radio,
    RadioGroup,
    Alert,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react';
import { PasswordInput } from './PasswordInput';
import '../styles/UserForm.css';

export function UserForm({ route }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { obtenerUser } = useContext(AuthContext);

    const [message, setMessage] = useState('');
    const [logMessage, setLogMessage] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        if (route === 'login') {
            try {
                const res = await login(data);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                obtenerUser();
                navigate('/');
                location.reload();
            } catch (errors) {
                if (
                    errors.response.data.detail ===
                    'No active account found with the given credentials'
                ) {
                    setLogMessage('Incorrect User or Password');
                }
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
        <div className='form-body'>
            {route === 'login' ? (
                <h1 className='title'>Login</h1>
            ) : (
                <h1 className='title'>Register</h1>
            )}
            <form onSubmit={onSubmit}>
                <Stack spacing={10}>
                    <Input
                        variant='flushed'
                        size='md'
                        id='username'
                        name='username'
                        placeholder='Username'
                        {...register('username', { required: true })}
                    />
                    {errors.username && (
                        <Alert status='error' variant='solid' borderRadius='md'>
                            <AlertIcon />
                            <AlertTitle>User is required</AlertTitle>
                        </Alert>
                    )}
                    {route === 'register' && (
                        <RadioGroup onChange={setGender} value={gender}>
                            <h2 className='gender'>Gender</h2>
                            <Stack direction='column'>
                                <Radio
                                    colorScheme='yellow'
                                    size='md'
                                    value='Male'
                                >
                                    Male
                                </Radio>
                                <Radio
                                    colorScheme='yellow'
                                    size='md'
                                    value='Female'
                                >
                                    Female
                                </Radio>
                                <Radio
                                    colorScheme='yellow'
                                    size='md'
                                    value='Filipino'
                                >
                                    Filipino
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    )}
                    <PasswordInput register={register} errors={errors} />
                    {errors.password && (
                        <Alert status='error' variant='solid' borderRadius='md'>
                            <AlertIcon />
                            <AlertTitle>Password is required!</AlertTitle>
                        </Alert>
                    )}
                    {route === 'login' ? (
                        <GoodButton>Login</GoodButton>
                    ) : (
                        <GoodButton>Register</GoodButton>
                    )}
                    {route === 'login' && logMessage && (
                        <Alert status='error' variant='solid' borderRadius='md'>
                            <AlertIcon />
                            <AlertTitle>{logMessage}</AlertTitle>
                        </Alert>
                    )}
                    {route === 'register' && message && (
                        <Alert status='error' variant='solid' borderRadius='md'>
                        <AlertIcon />
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>
                    )}
                </Stack>
            </form>
        </div>
    );
}
