import { useState, useEffect } from "react";
import Loader from '../../Component/Loader/Loader';
import { getAllBlogs } from '../../api/internal'
import { useNavigate } from "react-router-dom";

function Blog(){

    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async function getAllBlogsApiCall(){
            const response = await getAllBlogs();
            if(response.status === 200){
                setBlogs(response.data.blogs)
            }
        })();

        setBlogs([])
    }, []);

    if(blogs.length === 0){
        return <Loader></Loader>
    }

    return(
        <div className="my-14 mt-24 mx-0 flex flex-col gap-14 items-center flex-wrap">
            {blogs.map((blog) => (
                <div 
                onClick={() => navigate(`/blog/${blog._id}`)} 
                key={blog._id}
                className="bg-white border  border-black rounded-md md:w-1/2 w-3/4 h-2/5 md:h-2/4 p-4 my-10 mx-5 cursor-pointer flex flex-col items-center  justify-center "
                >
                    <h1 className="text-left font-bold text-lg my-4 bg-transparent text-black hover:text-blue-800 ">{blog.title}</h1>
                    <img className="w-80 h-60 rounded-sm " src={blog.photo} alt="" />
                    <p className="mt-5 font-bold ">{blog.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Blog;