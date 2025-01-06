
function Comment({comment}){
    const date = new Date(comment.createdAt).toDateString();

    return (
        <div className="flex items-center justify-start gap-5 m-3 border-b-2 border-black  ">
            <div className="my-2 mx-0">
                <div className="font-bold mr-2">{comment.authorUsername}</div>
                <div className="font-bold  text-xs ">{date}</div>
                <div className="text-lg font-bold py-1 px-0  ">{comment.content}</div>
            </div>
        </div>
    )
}


export default Comment;