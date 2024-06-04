import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function Navigation() {
    const { isAuthorized } = useContext(AuthContext);
    
    return (
        <>
            <NavLink to='/home' ClassName="active">
                <span><svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-rocket-takeoff-fill'
                    viewBox='0 0 16 16'
                >
                    <path d='M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.6 3.6 0 0 0-.108-.563 2 2 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2 2 0 0 0-.16-.045 4 4 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.55 2.55 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361s.437 1.732-.36 2.531Z' />
                    <path d='M5.205 10.787a7.6 7.6 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925' />
                </svg>Home</span>
            </NavLink>
            {isAuthorized && (
                <NavLink to='/profile' ClassName="active">
                    <span><svg
                        className='w-6 h-6 text-gray-800 dark:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fillRule='evenodd'
                            d='M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z'
                            clipRule='evenodd'
                        />
                    </svg>Profile</span>
                </NavLink>
            )}
            {isAuthorized && (
                <NavLink to='/trophies' ClassName="active">
                    <span><svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        className='bi bi-trophy-fill'
                        viewBox='0 0 16 16'
                    >
                        <path d='M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935' />
                    </svg>Trophies</span>
                </NavLink>
            )}
            {isAuthorized && (
                <NavLink to='/following' ClassName="active">
                    <span><svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        className='bi bi-person-heart'
                        viewBox='0 0 16 16'
                    >
                        <path d='M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z' />
                    </svg>Following</span>
                </NavLink>
            )}
            {isAuthorized && (
                <NavLink to='/clan' ClassName="active">
                    <span><svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        className='bi bi-people-fill'
                        viewBox='0 0 16 16'
                    >
                        <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' />
                    </svg>Clan</span>
                </NavLink>
            )}
            {isAuthorized && (
                <NavLink to='/chat' ClassName="active">
                    <span><svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        className='bi bi-chat-dots-fill'
                        viewBox='0 0 16 16'
                    >
                        <path d='M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
                    </svg>Chat</span>
                </NavLink>
            )}
            {isAuthorized && (
                <NavLink to='logout' ClassName="active">
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        className='bi bi-box-arrow-left'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fillRule='evenodd'
                            d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z'
                        />
                        <path
                            fillRule='evenodd'
                            d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
                        />
                    </svg>
                </NavLink>
            )}
            {isAuthorized === false && (
                <NavLink to='/login' ClassName="active">
                    <span>Login</span>
                </NavLink>
            )}
            {isAuthorized === false && (
                <NavLink to='/register' ClassName="active">
                    <span>Register</span>
                </NavLink>
            )}
        </>
    );
}
