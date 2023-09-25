import {supabase} from "../supabase/index.js";
import {useCallback, useEffect, useState} from "react";
import Loading from "./Loading.jsx";
import BlogCard from "./BlogCard.jsx";
import {useSearchParams} from "react-router-dom";
import Button from '@mui/material/Button';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [index, setIndex] = useState(0)
    const [limit, setLimit] = useState(10)
    const [sindex, setSIndex] = useState(0)
    const [slimit, setSLimit] = useState(10)
    const [search, setSearch] = useState(false)
    const [posts, setPosts] = useState({})
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [showL, setShowL] = useState(false)
    const callerPost = useCallback(async () => {
        setShowL(true)
        const data = await supabase
            .from('blogs')
            .select(`*,categories(*),user_profiles(*)`)
            .range(sindex, slimit)
            .ilike('title', `%${query}%`).order('id', {ascending: false})
        setPosts(data)
        setIsLoading(false)
        setShowL(false)

    }, [sindex, slimit, query])
    const callerPostAll = useCallback(async () => {
        setShowL(true)
        const data = await supabase
            .from('blogs')
            .select(`*,categories(*),user_profiles(*)`)
            .range(index, limit)
            .order('id', {ascending: false})
        setPosts(data)
        setIsLoading(false)
        setShowL(false)
    }, [index, limit])

    useEffect(() => {
        callerPostAll()
    }, [callerPostAll]);
    useEffect(() => {
        callerPost()
    }, [callerPost]);
    useEffect(() => {
        if (query.length === 0) {
            setSearchParams({})
        }
    }, [query, setSearchParams]);
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(true)
        callerPost()
    }
    const handleClick = () => {
        setIsLoading(true)
        setSearchParams({})
        setSearch(false)
        setQuery("")
        callerPostAll()
    }
    console.log(index, limit)
    console.log(sindex, slimit)
    const handleMore = () => {
        if (search) {
            setSLimit(prevState => prevState + 10)
            setSIndex(prevState => prevState + 10)
        } else {
            setLimit(prevState => prevState + 10)
            setIndex(prevState => prevState + 10)
        }
    }
    const handleLess = () => {
        if (search) {
            setSLimit(prevState => {
                if (prevState > 20) {
                    return prevState - 10
                } else {
                    return 10
                }
            })
            
            setSIndex(prevState => {
                if (prevState > 10) {
                    return prevState - 10
                } else {
                    return 0
                }
            })
        } else {
            setLimit(prevState => {
                if (prevState > 20) {
                    return prevState - 10
                } else {
                    return prevState
                }
            })
            setIndex(prevState => {
                if (prevState > 10) {
                    return prevState - 10
                } else {
                    return prevState
                }
            })
        }
    }
    return (<>
        {isLoading && <Loading/>}
        {!isLoading && <div className='flex container mx-auto flex-col-reverse lg:flex-row mt-5 p-5 pt-[85px]'>
            <section className='w-full lg:w-[60%] flex flex-col justify-center items-center gap-y-5'>
                {!isLoading && posts?.data?.map((post) => (<BlogCard key={post.id} blog={post}/>))}
                <div className='flex justify-between items-center w-full'>
                    {search ? <Button onClick={handleLess} variant="contained" color="success">
                        {showL ? "Loading.." : "PrevF"}
                    </Button> : <Button onClick={handleLess} variant="contained" color="success">
                        {showL ? "Loading.." : "Prev"}
                    </Button>}
                    {search ? <Button onClick={handleMore} variant="contained" color="success">
                        {showL ? "Loading.." : "NextF"}
                    </Button> : <Button onClick={handleMore} variant="contained" color="success">
                        {showL ? "Loading.." : "Next"}
                    </Button>}
                </div>
            </section>
            <section className='w-full mb-5 lg:mb-0 lg:w-[40%] px-0 lg:px-5'>
                <form onSubmit={handleSubmit} className='sticky top-[85px]'>
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input value={query} onChange={(e) => {
                            setSearchParams({
                                title: e.target.value
                            })
                            setQuery(e.target.value)
                        }} type="search" id="default-search"
                               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search Blogs..." required/>
                        {search ? <button type="button" onClick={handleClick}
                                          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-3 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button> : <button type="submit"
                                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>}
                    </div>
                </form>
            </section>
        </div>}
    </>)
}
export default Home