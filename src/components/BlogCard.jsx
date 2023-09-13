import {Link} from "react-router-dom";

export default function BlogCard({blog}) {
    return (
        <article className="w-full flex bg-white transition hover:shadow-xl">
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <div
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                    <span>{blog.created_at.substr(0, 4)}</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>{blog.created_at.substr(5, 5)}</span>
                </div>
            </div>

            <div className="hidden sm:block sm:basis-56">
                <img
                    alt="Guitar"
                    src={blog.image}
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <Link to={`/detail/${blog.id}`}>
                        <h3 className="font-bold uppercase text-gray-900">
                            {
                                blog.title
                            }
                        </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        {blog.description}
                    </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                    <Link
                        to={`/detail/${blog.id}`}
                        className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                    >
                        Read Blog
                    </Link>
                </div>
            </div>
        </article>
    );
}