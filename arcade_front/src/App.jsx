import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ClanContextProvider } from './context/ClanContext';
import { TrophieContextProvider } from './context/TrophieContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Trophies } from './pages/Trophies';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Following } from './pages/Following';
import { Clan } from './pages/Clan';
import { Clanes } from './pages/Clanes';
import { ClanCreate } from './pages/ClanCreate';
import { Trophie } from './components/Trophie';
import { User } from './pages/User';
import { FreeGame } from './pages/FreeGame';
import { GamePage } from './pages/GamePage';

function Logout() {
    localStorage.clear();
    return <Navigate to='/login' />;
}

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <ClanContextProvider>
                    <TrophieContextProvider>
                        <Navigation />
                        <Routes>
                            <Route path='/' element={<Navigate to='/home' />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/game/' element={<FreeGame />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='*' element={<NotFound />} />
                            <Route
                                path='/game/:id'
                                element={
                                    <ProtectedRoute>
                                        <GamePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/profile'
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/user/:id'
                                element={
                                    <ProtectedRoute>
                                        <User />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/clanes/'
                                element={
                                    <ProtectedRoute>
                                        <Clanes />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/clan/:id/'
                                element={
                                    <ProtectedRoute>
                                        <Clan />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/clan/create/'
                                element={
                                    <ProtectedRoute>
                                        <ClanCreate />
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
                            <Route
                                path='/trophie/:id/'
                                element={
                                    <ProtectedRoute>
                                        <Trophie />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </TrophieContextProvider>
                </ClanContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
