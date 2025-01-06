import { Link } from 'react-router-dom';


function Error(){
    return (
        <div className="flex items-center flex-col h-3/5/ justify-center ">
            <div className="text-5xl font-bold text-red-600 ">
                Error 404 - Page not found
            </div>
            <div className="text-3xl my-7 mx-0 ">
                Go back to 
                <Link to='/' className="ml-3 font-bold text-blue-600 no-underline">
                     home
                </Link>
            </div>
        </div>
    )
}

export default Error;