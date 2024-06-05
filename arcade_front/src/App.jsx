import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Trophies } from './pages/Trophies';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/Navigation';
import { Clan } from './pages/Clan';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Following } from './pages/Following';


function Logout() {
    localStorage.clear();
    return <Navigate to='/login' />;
}

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Navigation />

                <Routes>
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/game' element={<Game />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<NotFound />} />
                    <Route
                        path='/profile'
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/clan'
                        element={
                            <ProtectedRoute>
                                <Clan />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/following'
                        element={
                            <ProtectedRoute>
                                <Following />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/trophies'
                        element={
                            <ProtectedRoute>
                                <Trophies />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
