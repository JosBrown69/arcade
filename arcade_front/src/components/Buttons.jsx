import { Button } from '@chakra-ui/react';

export function GoodButton({ children }) {
    return (
        <Button
            size='md'
            color='#ffffff'
            bg='brand.50'
            _hover={{ bg: 'brand.55' }}
            type='submit'
        >
            {children}
        </Button>
    );
}

export function BadButton({ children }) {
    return (
        <Button size='sm' color='#ffffff' bg='brand.300' type='submit'>
            {children}
        </Button>
    );
}
