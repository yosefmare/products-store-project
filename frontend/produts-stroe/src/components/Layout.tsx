import { Outlet } from 'react-router-dom';
import NavBar from './navbar/NavBar'; // Assuming you have a NavBar component

const Layout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Layout;
