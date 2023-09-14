import {supabase} from "../supabase/index.js";
import {useEffect, useState} from "react";
import Loading from "./Loading.jsx";
import BlogCard from "./BlogCard.jsx";
import {useSearchParams} from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    console.log(searchParams)
    const [posts, setPosts] = useState({})
    const [query,setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getPost = async () => {
            const  data  = await supabase
                .from('blogs')
                .select()
                .ilike('title', `%${query}%`).order('id', {ascending: false})
            setPosts(data)
            setIsLoading(false)
        }
        setTimeout(()=>{
            getPost()
        },1500)
        if (query.length === 0){
            setSearchParams({})
        }
        return clearTimeout(()=>{})
    }, [query]);
    return (
        <>
            {isLoading && <Loading/>}
            {!isLoading && <div className='flex flex-col-reverse lg:flex-row mt-5 p-5 pt-[85px]'>
                <section className='w-full lg:w-[70%] flex flex-col justify-center items-center gap-y-5'>
                    {!isLoading && posts?.data?.map((post) => (
                        <BlogCard key={post.id} blog={post}/>
                    ))}
                </section>
                <section className='w-full mb-5 lg:mb-0 lg:w-[30%] px-5'>
                    <form className="flex items-center">
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                                </svg>
                            </div>
                            <input onChange={e=>{
                                setSearchParams({"title":e.target.value})
                                setQuery(e.target.value)
                            }} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search blogs..." required/>
                        </div>
                    </form>
                </section>
            </div>}
        </>
    )
}
export default Home