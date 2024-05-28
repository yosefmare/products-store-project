import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { darkAndLightMode } from '../../contaxts/globalContexts';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Auth } from '../../features/authSlice';
import { loadUserDataFromLocalStorage } from '../../features/api/authAsyncThunk.api';

const defaultProfileImage: string = '/default-profile-image/default-profile-image.webp'

const navLinks = [
    { content: 'products', path: '/products' },
    { content: 'customers', path: '/customers' },
    { content: 'purchases', path: '/purchases' }
];

const NavBar = (): JSX.Element => {

    const [userData, setUserData] = useState<Auth | null>({
        _id: '',
        userName: '',
        email: '',
        password: '',
        role: '',
        profileImg: '',
        token: ''
    });
    const [darkMode, setDarkMode] = useState(false);
    const authSlice = useAppSelector((state) => state.authSlice)

    useEffect(() => {
        const userData = loadUserDataFromLocalStorage()
        setUserData(userData)
    }, [authSlice.auth])

    const darkAdLightModeSwitcher = darkMode ? 'transition-dark dark:bg-slate-900 text-white' : 'transition-light';
    return (
        <darkAndLightMode.Provider value={darkAdLightModeSwitcher}>

            <div className={`flex justify-between py-4 ${darkAdLightModeSwitcher}`}>

                {/* features */}
                <div className=' ml-4'>
                    {!darkMode ? <MdDarkMode className="text-3xl" onClick={() => setDarkMode(!darkMode)} /> : <MdLightMode className="text-3xl" onClick={() => setDarkMode(!darkMode)} />}
                </div>

                {/* main nav content */}
                <ul className='flex gap-10'>
                    {
                        navLinks.map((content, index) => <li key={index} className='btn'><Link to={content.path}>{content.content}</Link></li>)
                    }
                </ul>

                {/* user info */}
                <div>
                    <div className='flex gap-2 justify-center items-center mr-4'>
                        <h3 className=' font-bold'>{userData?.userName}</h3>
                        <Link to={'/user/profile/updateImage'}>
                            <img className='w-10 h-10 rounded-full cursor-pointer' src={`${userData?.profileImg? `../../../public/${userData?.profileImg}`: defaultProfileImage}`} alt="profileImg" />
                        </Link>
                    </div>
                </div>
            </div>
        </darkAndLightMode.Provider>
    );
};

export default NavBar;