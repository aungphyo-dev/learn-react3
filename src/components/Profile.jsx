import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";
import {useNavigate, useParams} from "react-router-dom";
import UserBlogCard from "./UserBlogCard.jsx";
const Profile = () => {
    const {slug} = useParams()
    const [email,setEmail] = useState("")
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
    const handleLogout =async () => {
        await supabase.auth.signOut()
        nav("/")
    }
    const [posts, setPosts] = useState({})
    const getPost = async () => {
        const posts = await supabase.from('blogs').select(`*`).order('id', {ascending: false}).eq("user_id",slug)
        setPosts(posts)
    }
    useEffect(() => {
        const get = async () => {
            const {data} = await supabase.auth.getSession()
            setEmail(data.session.user.email)
        }
        get()
        getPost()
    }, [blogs]);
    return(
        <div className="min-h-screen pt-[85px]">
            <div className="border-b-2 block md:flex">
                <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                    <div className="flex justify-between mb-5">
                        <span className="text-xl font-semibold block">Admin Profile</span>
                        <button onClick={handleLogout}  className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Log Out</button>
                    </div>
                    <span className="text-gray-600">This information is secret so be careful</span>
                </div>
                <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                    <div className="rounded  shadow p-6">
                        <div className="pb-6">
                            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
                            <div className="flex">
                                <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value="Blogger" />
                            </div>
                        </div>
                        <div className="pb-4">
                            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</label>
                            <input disabled id="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" value={email}/>
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
    )
}
export default Profile