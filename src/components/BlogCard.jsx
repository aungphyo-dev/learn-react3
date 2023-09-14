import {Link} from "react-router-dom";
import {object} from 'prop-types';

export default function BlogCard({blog}) {
    return (
        <div key={blog.id} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
            <Link to={`/detail/${blog.id}`} className="space-y-3">
                <div className="flex items-center gap-x-3">
                    <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center overflow-hidden">
                        <img src={blog.user_information.image} className='block w-full h-full rounded-full' alt="user"/>
                    </div>
                    <div>
                        <div className='flex justify-start items-center'>
                            <span className="block text-sm text-indigo-600 font-medium">{blog.user_information.name}</span>
                            <span className=" ml-2 inline-flex items-center justify-center text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                                                <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                                              </svg>
                                          <span className="sr-only">Icon description</span>
                                        </span>
                        </div>
                        <h3 className="text-base text-gray-800 font-semibold mt-1">{blog.title}</h3>
                    </div>
                </div>
                <p className="text-gray-600 sm:text-sm line-clamp-4">
                    {blog.description}
                </p>
                <div className="text-sm text-gray-600 flex items-center gap-6">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 6V5C6 3.34315 7.34315 2 9 2H11C12.6569 2 14 3.34315 14 5V6H16C17.1046 6 18 6.89543 18 8V11.5708C15.5096 12.4947 12.8149 12.9999 10 12.9999C7.18514 12.9999 4.49037 12.4947 2 11.5707V8C2 6.89543 2.89543 6 4 6H6ZM8 5C8 4.44772 8.44772 4 9 4H11C11.5523 4 12 4.44772 12 5V6H8V5ZM9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="#9CA3AF" />
                                            <path d="M2 13.6923V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V13.6923C15.4872 14.5404 12.7964 14.9999 10 14.9999C7.20363 14.9999 4.51279 14.5404 2 13.6923Z" fill="#9CA3AF" />
                                        </svg>
                                        {blog.categories.name}
                                    </span>
                </div>
            </Link>
        </div>
    );
}
BlogCard.propTypes = {
    blog : object
}