import React, { useState } from 'react'
import { ReplyListComponent } from "./ReplyListComponent";
export const PostComponent = ({ p, index, setshowAddReply, setreplyto}) => {
     var [showReplyList, setshowReplyList] = useState(false)
    return (
                <div className="mb-3 border-bottom" key={p._id} >
                    <div class="d-flex flex-row">
                        <div class="p-2"> <img className="icon-user" src={"https://picsum.photos/100?random="+p.userid._id} /></div>
                        <div class="p-2">
                            <span><b> {p.userid.name} </b></span><br />
                            <span className='sm-txt text-muted' ><b> {p.userid.email} </b></span>
                        </div>
                    </div>
                    <div className="pt-2 pb-3 px-3" >
                        <h4> {p.title} </h4>
                        <span> {p.description} </span><br/>
                        <span className="sm-txt text-primary" onClick={() => { setshowAddReply(true); setreplyto(p._id); } } > Add Reply </span> 
                        <span className="sm-txt text-primary pl-2 " onClick={()=> setshowReplyList(!showReplyList) } > {p.replies.length} Replies</span>
                    </div>

                    { showReplyList && <ReplyListComponent replies={p.replies} ></ReplyListComponent> }

                </div>
    )
}
