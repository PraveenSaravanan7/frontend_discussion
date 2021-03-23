import React from 'react'

export const ReplyListComponent = ({replies}) => {
    return (
        <div className="mb-3" >
            <h5>Replies</h5>
            {replies.length? <>
                {replies.map((r, index)=>
                     <div className="mb-1 border-bottom" key={r._id} >
                     <div class="d-flex flex-row">
                         <div class="p-2"> <img className="icon-user2" src={"https://picsum.photos/100?random="+r.userid._id} /></div>
                         <div class="pl-0 py-2">
                             <span className="sm-txt" ><b> {r.userid.name} </b></span><br />                             
                         </div>
                     </div>
                     <div className=" pb-3 px-3" >
                        <span> {r.reply} </span><br/>                         
                     </div>
                 </div>
                )}
            </>: <span> 😕 No replies.</span> }
        </div>
    )
}
