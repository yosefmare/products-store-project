import { useState, useEffect } from 'react';
import { getUserDataFromLocalStorage } from '../../handelers/handelers';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { darkAndLightMode } from '../../contaxts/globalContexts';
import { Link } from 'react-router-dom';


interface UserData {
    userName?: string;
    profileImg?: string;
}

const defaultProfileImage: string = '/default-profile-image/default-profile-image.webp'

const navLinks = [
    {
        content: 'products',
        path: '/products'
    },
    {
        content: 'customers',
        path: '/customers'
    },
    {
        content: 'purchases',
        path: '/purchases'
    }
]

const NavBar = (): JSX.Element => {

    const [darkMode, setUDarkMode] = useState(false);
    const [userData, setUserData] = useState<UserData>({});

    useEffect(() => {
        const data = getUserDataFromLocalStorage()
        setUserData(data)
    }, []);

    const darkAdLightModeSwitcher = darkMode ? 'transition-dark dark:bg-slate-900 text-white' : 'transition-light';
    return (
        <darkAndLightMode.Provider value={darkAdLightModeSwitcher}>

            <div className={`flex justify-between py-4 ${darkAdLightModeSwitcher}`}>

                {/* features */}
                <div className=' ml-4'>
                    {!darkMode ? <MdDarkMode className="text-3xl" onClick={() => setUDarkMode(!darkMode)} /> : <MdLightMode className="text-3xl" onClick={() => setUDarkMode(!darkMode)} />}
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
                        <h3 className=' font-bold'>{userData.userName}</h3>
                        <img className='w-10 h-10 rounded-full cursor-pointer' src={!userData.profileImg ? defaultProfileImage : userData.profileImg} alt="profileImg" />
                    </div>
                </div>
            </div>
        </darkAndLightMode.Provider>
    );
};

export default NavBar;