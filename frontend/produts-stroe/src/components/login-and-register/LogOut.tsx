import React from 'react';
import {
    useNavigate
} from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/hooks';
import { logoutUser } from '../../features/authSlice';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const dispath = useAppDispatch()
    const handleLogout = () => {
        localStorage.clear();
        dispath(logoutUser())
        navigate("/login")
    };
    return (
        <button onClick={
            (e) => {
                e.preventDefault();
                handleLogout();
            }
        }
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
            Log Out
        </button>
    );
};
export default LogoutButton;