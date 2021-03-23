import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "../api"
import { PostComponent } from "../components/PostComponent";
const ls = require("local-storage")
export const HomePage = () => {
    const accessToken = ls("accessToken")
    var [user, setUser] = useState([])
    var [posts, setPosts] = useState([])
    var [showAdd, setshowAdd] = useState(false)
    var [showAddReply, setshowAddReply] = useState(false)
    var [formData, updateFormData] = useState([]);
    var [formDataReply, updateFormDataReply] = useState([]);
    var [replyto, setreplyto] = useState()
    var [loading, setloading] = useState(false);
    var [err, seterr] = useState(false);
    
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
      };

    const handleChangeReply = (e) => {
        updateFormDataReply({
          ...formDataReply,
          [e.target.name]: e.target.value.trim()
        });
      };
    
    async function getUser() {
        seterr(false)
        try {
            let url = "/users"
            const response = await axios.get(url);
            if (response.data) {
                console.log(response.data)
                return response.data
            }
        } catch (error) {
            seterr(error)
        }
    }
    
    async function getPosts() {
        seterr(false)
        try {
            let url = "/posts"
            const response = await axios.get(url);
            if (response.data) {
                console.log(response.data)
                return response.data
            }
        } catch (error) {
            seterr(error)
        }
    }

    async function addpost() {
        setloading(true)
        seterr(false)
        try {
          const response = await axios.post('/posts', formData);
          setloading(false)
          setshowAdd(false)
          if (response.data) {
            return response.data
          }
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }

    async function addReply() {
        setloading(true)
        seterr(false)
        try {
          const response = await axios.put('/posts/reply/'+replyto , formDataReply);
          setloading(false)
          setshowAddReply(false)
          if (response.data) {
            return response.data
          }
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }

    function handleAdd(event) {
        event.preventDefault();
        addpost().then(data => {
            let allposts = [...posts]
            allposts.unshift(data)
            setPosts(allposts)
          console.log(data)
        })
      }

    function handleAddReply(event) {
        event.preventDefault();
        addReply().then(data => {
            let allposts = [...posts]
            let indexofpost = allposts.findIndex( p =>  p._id == data._id  )
            allposts[indexofpost] = data
            setPosts(allposts)
          console.log(data, indexofpost)
        })
      }

    useEffect(() => {
        if(accessToken){
        getUser().then(data => {
            setUser(data)
        })}
        getPosts().then(data => {
            setPosts(data)
        })
    }, [])

    return (
        <div>
            <div className="px-3 pt-3 container bg-white fixed-top" > 
                <h3 className="text-dark logo-txt2 " ><b>Discussion App</b></h3>
            </div>
             
            { ls("accessToken") &&
            <>
                { showAdd ? 
            <div className="px-3 py-2  container bg-white fixed-bottom" >
            <div className="col-md-4 m-auto" >
                <h2> Add Discussion <button className="btn btn-link btn-sm float-right" onClick={() => setshowAdd(false) } > X </button> </h2>
            <form onSubmit={(event) => handleAdd(event)}>
            <div className="form-group ">
              <span >Title</span>
              <input onChange={handleChange} type="text" className="form-control" required name="title" />
            </div>
            <div className="form-group ">
              <span >Description</span>
              <textarea onChange={handleChange} type="text" className="form-control" required name="description" ></textarea>
            </div>
            <div className="mt-2" >
                <button type="submit" className="btn btn-primary btn-sm btn-block" > {loading ? <>Loading...</> : <>Submit</>} </button>
            </div>
            </form>
            </div> </div> : null }
            </> }
            
            { ls("accessToken") &&
            <>
                { showAddReply ? 
            <div className="px-3 py-2  container bg-white fixed-bottom" >
            <div className="col-md-4 m-auto" >
                <h2> Add Reply <button className="btn btn-link btn-sm float-right" onClick={() => setshowAddReply(false) } > X </button> </h2>
            <form onSubmit={(event) => handleAddReply(event)}>
            <div className="form-group ">
              <span >Reply</span>
              <input onChange={handleChangeReply} type="text" className="form-control" required name="reply" />
            </div>
            <div className="mt-2" >
                <button type="submit" className="btn btn-primary btn-sm btn-block" > {loading ? <>Loading...</> : <>Submit</>} </button>
            </div>
            </form>
            </div> </div> : null }
            </> }
            
            <div className=" pt-5 mt-5 " >
               <div  >
                   <div className="col-md-6 m-auto" >
                       <h2>Welcome!</h2>           
                      { accessToken ? <>
                            <div class="d-flex flex-row">
                                <div class="p-2"> <img className="icon-user" src="https://picsum.photos/100" /></div>
                                <div class="p-2"> 
                                <span><b> {user.name} </b></span><br/>
                                <span className='sm-txt text-muted' ><b> {user.email} </b></span><br/>
                                <button className="btn btn-primary mt-2 btn-sm" onClick={ () => setshowAdd(true) } > Add Discussion </button>
                                </div>
                            </div>
                            
                           </>:
                           <>
                           <div className="container pl-0" >
                           <span>Please Sign Up to get started!</span><br/>
                           <Link to={'/login'} >
                            <button className="btn btn-primary mt-2 px-4" > Sign Up </button>
                            </Link>
                           </div>
                           </>
                           }

                        <h2 className="mt-4" >Discussions </h2>   
                        <div className="col-md-8 m-0 p-0" >
                           { posts.length ?  
                            <div className="allposts mt-4" >
                                {posts.map((p, index) =>  <PostComponent p={p} index={index} setshowAddReply={setshowAddReply} setreplyto={setreplyto} ></PostComponent> )}                          
                           </div>
                           : null }
                        </div>
                   </div>
               </div>
            </div>
        </div>
    )
}
