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
        console.log(post)
        setIsLoading(false)
    }
    useEffect(() => {
        getPost()
    }, []);
    return (
        <section className='w-full p-5 min-h-screen flex flex-col justify-start items-start'>
            {
                !isLoading && <div className="p-5 mx-auto sm:p-10 md:p-16 text-gray-100">
                    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                        <img src={post.data[0].image} alt="" className="w-full h-60 sm:h-96 bg-gray-500" />
                        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
                            <div className="space-y-2">
                                <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{post.data[0].title}</a>
                                <p className="text-xs text-gray-400">By
                                    <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">Leroy Jenkins</a>
                                </p>
                            </div>
                            <div className="text-gray-100">
                                <p>{
                                    post.data[0].description
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
</section>
)
}
export default Detail