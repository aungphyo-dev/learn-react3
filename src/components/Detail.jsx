import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save.js";
import {Button} from "@mui/material";

const Detail = () => {
    const change =  (payload) => {
        console.log('Change received!', payload)
    }
   const dd = supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, change)
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'comments' }, change)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'comments' }, change)
        .subscribe()
    const {id} = useParams()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [comment,setComment] = useState("")
    const [commenting,setCommenting] = useState(false)
    const user = JSON.parse(localStorage.getItem("sb-rvfstgyjufrxnaindhkb-auth-token"))?.user.id
    const handleDelete =async (id) => {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id)
        console.log(error)

    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setCommenting(true)
        await supabase
            .from('comments')
            .insert([
                { blog_id: post[0].id, comment: comment,user_id:user },
            ])
            .select()
        setCommenting(false)
        setComment("")
    }
    const getPost = async () => {
        const {data} = await supabase.from('blogs').select(`*,comments(*)`).eq("id",id)
        setPost(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getPost()
    }, [dd]);
    return (
        <section className='w-full min-h-screen flex flex-col'>
            {
                !isLoading && <div className="p-0 mx-auto sm:p-10  md:p-16 text-gray-100">
                    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                        <img src={post[0].image} alt="" className="w-full h-96 bg-gray-500" />
                        <div className="p-5 md:p-6 pb-12 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
                            <div className="space-y-2">
                                <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{post[0].title}</a>
                                <p className="text-xs text-gray-400">By
                                    <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">Leroy Jenkins</a>
                                </p>
                            </div>
                            <div className="text-gray-100">
                                <p>{
                                    post[0].description
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Discussion
                            ({post[0]?.comments.length})
                        </h2>
                    </div>
                    {
                        user && <form className="mb-6" onSubmit={handleSubmit}>
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                <textarea id="comment" rows="6" value={comment} onChange={e=>setComment(e.target.value)}
                                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                          placeholder="Write a comment..." required></textarea>
                            </div>
                            <div className='flex justify-end items-center'>
                                {commenting ? <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    startIcon={<SaveIcon/>}
                                    variant="outlined"
                                >
                                    Waiting....
                                </LoadingButton> : <Button type={"submit"} variant="contained">Comment</Button>}
                            </div>
                        </form>
                    }
                    {
                        post[0]?.comments?.map(comment =>(
                            <article key={comment.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            // src={comment.user_information.image}
                                            alt="Michael Gough"/>
                                            {/*{comment.user_information.name}*/}
                                            <span className=" ml-2 inline-flex items-center justify-center  text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                                                <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                                              </svg>
                                          <span className="sr-only">Icon description</span>
                                        </span>
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {
                                                comment.created_at.substr(0, 10)
                                            }
                                        </p>
                                    </div>
                                    {
                                        user === comment.user_id && <button onClick={() => handleDelete(comment.id)}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                            </svg>
                                        </button>
                                    }
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {comment.comment}
                                </p>
                            </article>
                        ))
                    }
                </div>
            </section>
</section>
)
}
export default Detail