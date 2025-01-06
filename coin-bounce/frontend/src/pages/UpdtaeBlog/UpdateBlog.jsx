import { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "../../api/internal";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextInput from '../../Component/TextInput/TextInput'

function UpdateBlog(){
    const navigate = useNavigate();

    const params = useParams();
    const blogId = params.id;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        }
    }

    const author = useSelector(state => state.user._id);

    const updateHandle = async () => {

        //http 
        let data;
        if (photo.includes('http')) {
            data = {
                author,
                title,
                content,
                blogId
            };
        } else{
            data = {
                author,
                title,
                content,
                photo,
                blogId
            };
        }

        const response = await updateBlog(data);

        if (response.status === 200){
            navigate('/');
        }
    }


    useEffect(() => {
        async function getBlogDetails(){
            const response = await getBlogById(blogId);
            if (response.status === 200){
                setTitle(response.data.blog.title)
                setContent(response.data.blog.content)
                setPhoto(response.data.blog.photo)
            }
        }    
        getBlogDetails();
    }, [blogId]);
    


    return (
        <div className='mt-24 mx-auto w-10/12 h-[calc(100vh-200px)] flex flex-col items-center justify-center'>
        <div className='text-3xl font-bold w-[inherit] items-center mb-16'>Update your blog</div>
        <TextInput
            type="text"
            name="title"
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{width: '75%'}}

       />
        <textarea
            className='py-3 px-7 w-9/12 border border-black rounded-lg text-lg h-full '
            placeholder='your content goes here...'
            maxLength={400}
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <div className='text-lg flex md:flex-row flex-col justify-center w-8/12 ml-5 mt-4 items-center '>
            <p className='flex mr-2 flex-col'>Choose a photo</p>
            <input
                className="ml-6"
                type='file'
                name='photo'
                id='photo'
                accept='image/jpg, image/jpeg, image/png'
                onChange={getPhoto}
            />
            <img src={photo} alt="" width={150} height={150} />
        </div>
        <button
            className={"text-white w-2/5 rounded-lg py-4 px-8 ml-3 bg-blue-600 font-bold cursor-pointer mt-7 hover:bg-blue-400" 
            }
            onClick={updateHandle}
            >
            Update
        </button>


    </div>
    )
}

export default UpdateBlog;