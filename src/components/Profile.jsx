import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";
import {useNavigate, useParams} from "react-router-dom";
import UserBlogCard from "./UserBlogCard.jsx";
import {createPortal} from "react-dom";
import UserModal from "./UserModal.jsx";
const Profile = () => {
    const {slug} = useParams()
    const [user,setUser] = useState({})
    const nav = useNavigate()

    const blogs = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'blogs' },
            (payload) => {
                console.log('Change received!', payload)
            }
        )
        .subscribe()
    const [posts, setPosts] = useState({})
    const getPost = async () => {
        const posts = await supabase.from('blogs').select(`*`).order('id', {ascending: false}).eq("user_id",slug)
        setPosts(posts)
    }
    const getUser = async () => {
        const {data :{user},error} = await supabase.auth.getUser()
        if (error === null){
            setUser(user)
        }
    }
    useEffect(() => {
        getPost()
        getUser()
    }, [blogs]);
    const [modal,setModal] = useState(false)
    return(
        <>
            {
                modal && createPortal(<UserModal modal={modal} setMoal={setModal}/>,document.getElementById("modal"))
            }
            <div className="min-h-screen pt-[85px]">
                <div className="border-b-2 block md:flex">
                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                        <div className="flex mb-5">
                            <span className="text-xl font-semibold block">Admin Profile</span>
                        </div>
                        <div>
                            <img src={user.user_metadata?.image} alt=""/>
                        </div>
                        <span className="text-gray-600">This information is secret so be careful</span>
                    </div>
                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                        <div className="rounded  shadow p-6">
                            <div className="pb-6 flex justify-between items-center">
                                <div>
                                    <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
                                    <div className="flex">
                                        <div  id="username" className="border-1  rounded-r px-4 py-2 w-full">{user?.user_metadata?.name}</div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={()=> {
                                        setModal(!modal)
                                    }}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="pb-4">
                                <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</label>
                                <div  id="username" className="border-1  rounded-r px-4 py-2 w-full">{user?.email}</div>
                                <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='flex flex-col justify-center items-center gap-5 p-5'>
                    {posts?.data?.map((post) => (
                        <UserBlogCard  key={post.id} blog={post}/>
                    ))}
                </section>
            </div>
        </>
    )
}
export default Profile