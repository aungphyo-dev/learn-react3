import {Link} from "react-router-dom";
import {object} from 'prop-types';

export default function BlogCard({blog}) {
    return (
        <div key={blog.id} className="w-full flex flex-col justify-between pb-5">
            <div className='flex gap-x-2 justify-start items-center'>
                <img src={blog.user_profiles.image} className='w-11 h-11 rounded-full ring-2' alt=""/>
                <div>
                    <Link to={`/detail/${blog.id}`} className="text-gray-900 font-medium hover:text-indigo-600">
                        {blog.title}
                    </Link>
                    <br/>
                    {blog.user_profiles.name}
                </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-y-5 items-start justify-start mt-3">
                <div className="text-sm w-full md:w-[70%] h-full">
                    <p className="text-gray-700 line-clamp-4 mb-2">
                        {blog.description}
                    </p>
                    <div className='flex flex-wrap gap-3'>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                          <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                          </svg>
                            {
                                blog.created_at.substring(0,10)
                            }
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                          <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M15.045.007 9.31 0a1.965 1.965 0 0 0-1.4.585L.58 7.979a2 2 0 0 0 0 2.805l6.573 6.631a1.956 1.956 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 18 8.479v-5.5A2.972 2.972 0 0 0 15.045.007Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                          </svg>
                            {
                                blog.categories.name
                            }
                        </span>
                    </div>
                </div>
                <Link to={`/detail/${blog.id}`} className="block ml-0 md:ml-2 w-full md:w-[30%]">
                    <img alt={"blog"} className="w-full h-40 object-cover" src={blog.image}></img>
                </Link>
            </div>

        </div>
    );
}
BlogCard.propTypes = {
    blog : object
}