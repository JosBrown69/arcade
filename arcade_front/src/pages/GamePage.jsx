import { MainGame } from '../Games/PoliceChase/GameMain';
import { SuperJumpMain } from '../Games/SuperJump/SuperJumpMain';
import { useParams } from 'react-router-dom';
import { NotFound } from './NotFound';

export function GamePage() {
    const { id } = useParams();

    const gameComponents = {
        1: <MainGame />,
        2: <SuperJumpMain />,
    };

    return gameComponents[id] || <NotFound />;
}
