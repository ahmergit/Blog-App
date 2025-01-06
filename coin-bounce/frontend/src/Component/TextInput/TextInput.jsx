function TextInput(props) {
    return (
      <div className="flex flex-col w-full items-center">
        <input
          className="px-4 py-3 my-2 outline-none w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 border border-black rounded-lg text-lg"
          {...props}
        />
        {props.error && (
          <p className="text-red-600 text-left w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 text-base">
            {props.errormessage}
          </p>
        )}
      </div>
    );
  }
  
  export default TextInput;