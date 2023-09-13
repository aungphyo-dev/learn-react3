import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";

const Detail = () => {
    const {id} = useParams()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const getPost = async () => {
        const post = await supabase.from('blogs').select(`*`).eq("id", id)
        setPost(post)
        setIsLoading(false)
    }
    useEffect(() => {
        getPost()
    }, []);
    return (
        <section className='w-full p-5 min-h-screen flex flex-col justify-start items-start'>
            {
                !isLoading && <div>
                    <img src={post?.data[0]?.image} className='mb-4' alt=""/>
                    <h1 className='font-extrabold text-4xl mb-5 text-gray-700'>{post?.data[0]?.title}</h1>
                    <p className='text-lg'>{post?.data[0]?.description}</p>
                </div>
            }
</section>
)
}
export default Detail