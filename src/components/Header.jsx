import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./features/authSlice";
import { useState } from "react";

export default function Header() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('sessionData')
        navigator('/login')
    }

    return (
        <nav className="bg-gray-800 text-white py-4 flex justify-between items-center">
            <ul className="flex px-8 space-x-5 items-center">
                {!isAuthenticated ? null : (
                    <>
                        <li><Link to='/' className="hover:text-blue-500 p-2 ">Inicio</Link></li>
                        <li><Link to='/user' className="hover:text-blue-500 p-2">Usuarios</Link></li>
                        <li><Link to='/house' className="hover:text-blue-500 p-2">Casas</Link></li>
                    </>
                )}
                <li><Link to='/create-user' className="hover:text-blue-500 p-2">Crear Usuarios</Link></li>
            </ul>
            <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 px-5">
                {isAuthenticated ? (
                    <>
                        <div className="relative">
                            <img
                                src={`http://localhost:3000/${user.avatar}`}
                                alt="Avatar"
                                className="rounded-full h-10 w-10 cursor-pointer"
                                onClick={toggleMenu}
                            />
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <p className="block px-4 py-2 mt-2 w-48 bg-white rounded-md shadow-lg p-1">{user.name} {user.lastname} </p>
                                    <Link to={`/user/${user._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <Link to={'/change-password'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Change Password
                                    </Link>
                                    <a onClick={handleLogout} className="block px-4 py-2 text-sl text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <button className="p-2 pl-5 pr-5 items-end ml-auto text-white hover:bg-sky-500">
                        <Link className="hover:text-blue-500 p-2" to='/login'>Login</Link>
                    </button>
                )}
            </div>
        </nav>
    )
}