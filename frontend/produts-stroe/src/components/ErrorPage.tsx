import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-white px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <div className="mt-5">
                <Link
                    to="/products"
                    className="relative inline-block text-sm font-medium text-pink-500 group focus:outline-none focus:ring"
                >
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-pink-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative block px-8 py-3 bg-white border border-current">
                        Go Home
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
