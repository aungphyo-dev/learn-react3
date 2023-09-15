import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../supabase/index.js";
import {useEffect, useState} from "react";

function Navbar() {
    const [userSlug,setUserSlug] = useState("")
    const [userInfo,setUserInfo] = useState({})
    const [user,setUser] = useState(false)
    const [open,setOpen] = useState(false)
    const nav = useNavigate()
    useEffect(() => {
        const getDD = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUserInfo({
                name : user?.user_metadata?.name,
                email : user.email
            })
            setUserSlug(user.id)
        }
        supabase.auth.onAuthStateChange((event, session) => {
            if (session !== null){
                setUser(true)
                getDD()
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
        <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
                <Link to="/" className="flex items-center">
                    <img width="30" height="30" src="https://supabase.com/dashboard/img/supabase-logo.svg" alt="mac-os"/>   </Link>
                <div className="flex items-center relative md:order-2">
                    <button onClick={()=>setOpen(!open)} type="button" className="w-8 h-8 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        {user ? <img alt="Remy Sharp" src="https://img.icons8.com/?size=1x&id=20749&format=png"/> :
                            <img alt="Remy Sharp" src="https://img.icons8.com/?size=1x&id=98957&format=png"/>}
                    </button>
                    <div className={`z-50 ${open ? "block" : "hidden"} absolute top-[1rem] right-2 w-64 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                        {
                            user && <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">
                                    {userInfo.name}
                                </span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                        {
                                            userInfo.email
                                        }
                                </span>
                            </div>
                        }
                        {user && <ul className="py-2">
                            <li>
                                <Link to={"/create"} onClick={()=>setOpen(false)}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Create</Link>
                            </li>
                            <li>
                                <Link to={`/profile/${userSlug}`} onClick={()=>setOpen(false)}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}
                                   className="block text-start w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                    out</button>
                            </li>
                        </ul>}
                        {!user && <ul className="py-2">
                            <li>
                                <Link to={"/signup"} onClick={()=>setOpen(false)}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Up</Link>
                            </li>
                            <li>
                                <Link to={`/login`} onClick={()=>setOpen(false)}
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