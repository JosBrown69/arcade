import { useNavigate } from 'react-router-dom';

export function Logout() {

    const navigate = useNavigate()

    localStorage.clear();
    navigate('/home')
}
