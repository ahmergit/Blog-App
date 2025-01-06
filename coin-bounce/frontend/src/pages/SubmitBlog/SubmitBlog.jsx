import {useState} from 'react'
import { useSelector } from 'react-redux'
import { submitBlog } from '../../api/internal'
import TextInput from '../../Component/TextInput/TextInput'
import { useNavigate } from 'react-router-dom';

const SubmitBlog = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');
    

    const author = useSelector(state => state.user._id);

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        }
    }

    const submitHandle = async () => {
        const data = {
            author,title,content,photo

        };

        const response = await submitBlog(data);

        if (response.status === 201){
            navigate('/');
        }
    }

  return (
    <div className='mt-24 mx-auto w-[80vw] h-[calc(100vh-200px)] flex flex-col items-center justify-center'>
        <div className='text-5xl font-bold w-[inherit] items-center mb-16'>Create a blog</div>
        <TextInput
            type="text"
            name="title"
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{width: '60%'}}

        />
        <textarea
            className='py-3 px-7 w-3/5 border border-black rounded-lg text-lg max-h-40 sm:h-10 '
            placeholder='your content goes here...'
            maxLength={400}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: '30vh', resize: 'none' }}
        />
        <div className='text-lg flex md:flex-row flex-col justify-center w-3/5 mt-4 items-center '>
            <p className='mr-2'>Choose a photo</p>
            <input
                type='file'
                name='photo'
                id='photo'
                accept='image/jpg, image/jpeg, image/png'
                onChange={getPhoto}
            />
        </div>
        <button
            className={`text-white w-2/6 rounded-lg py-4 px-8 font-bold cursor-pointer mt-7 hover:bg-blue-400 ${
                title === '' || content === '' || photo === '' ? ' bg-blue-400' : 'bg-blue-600'
            }`}
            onClick={submitHandle}
            disabled={title === '' || content === '' || photo === ''}
            >
            Submit
        </button>


    </div>
  )
}

export default SubmitBlog