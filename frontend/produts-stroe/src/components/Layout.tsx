import { Outlet } from 'react-router-dom';
import NavBar from './navbar/NavBar';

const Layout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Layout;
