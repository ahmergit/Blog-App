import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogById, deleteBlog, getCommentById, postComment } from "../../api/internal";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import CommentList from "../../Component/CommentList/CommentList";


function BlogDetails(){

    const [blog, setBlog] = useState([]);
    const [comments, setComments] = useState([]);
    const [ownsBlog, setOwnsBlog] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const blogId = params.id;

    const username = useSelector(state => state.user.username);
    const userId = useSelector(state => state.user._id);

    useEffect(() => {
        async function getBlogDetails(){
            const commentResponse = await getCommentById(blogId);
            if (commentResponse.status === 200){
                setComments(commentResponse.data.data);
            }
            const blogResponse = await getBlogById(blogId);
            if (blogResponse.status === 200){
                // set ownership
                setOwnsBlog(username === blogResponse.data.blog.authorUsername)
                setBlog(blogResponse.data.blog);
            }
        }
        getBlogDetails();
    }, [reload, username, blogId]);


    const postCommentHandle = async () => {
        const data = {
            author: userId,
            blog: blogId,
            content: newComment
        }

        const response = await postComment(data);

        if(response.status === 201){
            setNewComment("");
            setReload(!reload);

        }
    }

    const deleteBlogHandle = async () => {
        const response = await deleteBlog(blogId);

        if (response.status === 200){
            navigate('/');

        }
    };

    if (blog.length === 0){
        return <Loader text="blog details"/>
    }

    return (
        <div className="mt-28 flex flex-col md:flex-row  justify-between items-center gap-12 mx-12">
            <div className="flex flex-col w-full md:w-2/5 justify-evenly items-center py-6 mx-0 ">
                <h1 className="font-bold text-lg">{blog.title}</h1>
                <div className="flex gap-6 justify-start">
                    <p>@{blog.authorUsername + " on " + new Date(blog.createdAt).toDateString() }</p>
                </div>
                <div className="my-10 mx-auto"  >
                    <img className="rounded-lg  " src={blog.photo} width={250} height={250} alt=""/>
                </div>
                <p className="">{blog.content}</p>
                {
                    ownsBlog && (
                        <div className="flex w-full justify-end mt-5 ">
                            <button className="ml-3 bg-green-400 text-white rounded-lg py-3 px-4 cursor-pointer font-bold h-fit hover:bg-green-600  " onClick={() => {navigate(`/blog/update/${blog._id}`)}}>Edit</button>
                            <button className="ml-3  bg-red-500 text-white rounded-lg py-3 px-4 cursor-pointer font-bold h-fit hover:bg-red-600 " onClick={deleteBlogHandle}>Detele</button>
                        </div>
                    )
                }

            </div>
            <div className="flex w-3/5 md:w-2/5 flex-col justify-between ">
                <div className="">
                    <CommentList comments={comments}/>
                    <div className="flex items-center justify-center">
                        <input
                            className="py-3 px-5 text-green-400 text-lg rounded-lg my-4 mx-2.5 boreder border-black flex-1 "
                            placeholder='comment goes here...'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="bg-blue-600 mr-5 text-white text-lg py-3 px-10 h-fit cursor-pointer rounded-lg hover:bg-blue-700 " onClick={postCommentHandle}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default BlogDetails;