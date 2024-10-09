import { MainGame } from '../Games/PoliceChase/GameMain';
import { useParams } from 'react-router-dom';
import { NotFound } from './NotFound';

export function GamePage() {
    const { id } = useParams();

    const gameComponents = {
        1: <MainGame />,
    };

    return gameComponents[id] || <NotFound />
}
