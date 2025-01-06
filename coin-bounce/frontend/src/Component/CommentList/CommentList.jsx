import Comment from "../Comment/Comment";
import '../CommentList/style.css'

function CommentList({comments}){
    return (
        <div className="flex w-11/12 flex-col ">
            <div className="custom">
                {comments.length === 0 ? 
                    (<div className="text-gray-400 font-bold text-base flex items-center justify-center h-full w-full  ">No Comments Posted</div>)
                    :
                    comments.map(comment => (
                        <Comment key={comment._id} comment={comment}/>
                    ))
                }
            </div>
        </div>
    )
}

export default CommentList;