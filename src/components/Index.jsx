import {supabase} from "../supabase/index.js";
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import Loading from "./Loading.jsx";
import {Link} from "react-router-dom";
import BlogCard from "./BlogCard.jsx";

const Home = () => {
    useEffect(() => {
        const get = async () => {
            const {data, error} = await supabase.auth.getSession()
            console.log(data, error)
        }
        get()
        getPost()

    }, []);
    const [posts, setPosts] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const getPost = async () => {
        const posts = await supabase.from('blogs').select(`*`).order('id', {ascending: false})
        setPosts(posts)
        setIsLoading(false)
    }
    return (
        <>
            {isLoading && <Loading/>}
            <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5'>
                {!isLoading && posts?.data?.map((post) => (
                    <BlogCard  key={post.id} blog={post}/>
                ))}
            </section>
        </>
    )
}
export default Home