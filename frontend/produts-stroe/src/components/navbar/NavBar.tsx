import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/hooks';
import ShoppingCard from './ShoppingCard';
import LogOut from '../login-and-register/LogOut';
import { loadUserDataFromLocalStorage } from '../../utils/utils';

const defaultProfileImage: string = '/default-profile-image/default-profile-image.webp'
const userData = loadUserDataFromLocalStorage()
const navLinks = [
    { content: 'products', path: '/products' },
    { content: 'customers', path: '/customers' },
    { content: 'purchases', path: '/purchases' }
];

const NavBar = (): JSX.Element => {
    const authSlice = useAppSelector((state) => state.authSlice.auth)

    return (
        <div className='flex justify-between py-4 $'>

            {/* features */}
            <div className='flex gap-2 items-center justify-center'>
            <ShoppingCard />
            <LogOut/>
            </div>
            {/* main nav content */}
            {authSlice?.role == 'admin'
                ?
                <ul className='flex gap-10'>
                    {
                        navLinks.map((content, index) => <li key={index} className='btn'><Link to={content.path}>{content.content}</Link></li>)
                    }
                </ul>
                :
                <></>
            }

            {/* user info */}
            <div>
                <div className='flex gap-2 justify-center items-center mr-4'>
                    <h3 className=' font-bold'>{userData?.userName}</h3>
                    <Link to={'/user/profile/updateImage'}>
                        <img className='w-10 h-10 rounded-full cursor-pointer' src={`${userData?.profileImg ? `/${userData?.profileImg}` : defaultProfileImage}`} alt="profileImg" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;