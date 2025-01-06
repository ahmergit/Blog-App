import { TailSpin } from 'react-loader-spinner'

function Loader({text}){
    return(
    <div className="flex flex-col gap-5 items-center mt-40 justify-center h-[cal(100vh-400px)] ">
            <h1>Loading {text}</h1>
            <TailSpin
                height={80}
                width={80}
                radius={1}
                color={"#3861fb"}
            />
        </div>
    )
}

export default Loader;