import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../supabase/index.js";
import {useEffect, useState} from "react";

function Navbar() {
    const [userSlug,setUserSlug] = useState("")
    const [user,setUser] = useState(false)
    const [userInfo,setUserInfo] = useState({})
    const nav = useNavigate()
    useEffect(() => {
        const getSlug =async () => {
           const {data} = await supabase.auth.getSession()
            setUserSlug(data?.session?.user?.id)
        }
        getSlug()
        supabase.auth.onAuthStateChange((event, session) => {
            if (session !== null){
                setUser(true)
            }else {
                setUser(false)
            }
        })
    }, [])
    const handleLogout =async () => {
        await supabase.auth.signOut()
        nav('/')
    }
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SPB</span>
                </Link>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        {user ? <img alt="Remy Sharp" src="https://img.icons8.com/?size=1x&id=20749&format=png"/> :
                            <img alt="Remy Sharp" src="https://img.icons8.com/?size=1x&id=98957&format=png"/>}
                    </button>
                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        {
                            user && <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                        {JSON.parse(localStorage.getItem("sb-guhrljahuzgrpuvbdiuf-auth-token")).user.email}
                                </span>
                            </div>
                        }
                        {user && <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link to={"/create"}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Create</Link>
                            </li>
                            <li>
                                <Link to={`/profile/${userSlug}`}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}
                                   className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                    out</button>
                            </li>
                        </ul>}
                        {!user && <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link to={"/signup"}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Up</Link>
                            </li>
                            <li>
                                <Link to={`/login`}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log In</Link>
                            </li>
                        </ul>}
                    </div>
            </div>
            </div>
        </nav>
    )
}
export default Navbar