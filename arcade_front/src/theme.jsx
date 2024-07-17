import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            50: '#fca311', // Amarillo
            55: '#FCBB54', // AMarillo hover
            100: '#14213d', // Azul
            200: '#e5e5e5', // Gris
            300: '#C4C4C4', // Gris Oscuro
            400: '#000000', // Negro
            500: '#ffffff', // Blanco
        },
    },
    styles: {
        global: {
            'html, body': {
                bg: 'brand.100',
                color: 'brand.200',
            },
        },
    },
});

export default theme;
