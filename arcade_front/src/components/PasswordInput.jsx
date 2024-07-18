import {InputGroup, Input, Button, InputRightElement} from '@chakra-ui/react'
import {useState} from 'react'

export function PasswordInput() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md'>
            <Input
                name='password'
                id='password'
                variant='flushed'
                type={show ? 'text' : 'password'}
                placeholder='Password'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}
