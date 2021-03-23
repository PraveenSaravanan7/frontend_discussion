import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../api'
const ls = require('local-storage')

export const LoginPage = () => {
  const history = useHistory()
  var [formData, updateFormData] = useState([]);
  var [loading, setloading] = useState(false);
  var [err, seterr] = useState(false);
  var [tab, settab] = useState(true)
  
  async function signup() {
    setloading(true)
    seterr(false)
    try {
      const response = await axios.post('/users', formData);
      if (response.data) {
        return response.data
      }
      setloading(false)
    } catch (error) {
      seterr(error);
      setloading(false)
    }
  }

  async function login() {
    setloading(true)
    seterr(false)
    try {
      const response = await axios.post('/users/login', formData);
      if (response.data) {
        return response.data
      }
      setloading(false)
    } catch (error) {
      seterr(error);
      setloading(false)
    }
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  function handleSignup(event) {
    event.preventDefault();
    signup().then(data => {
      if (data.accessToken) {
        ls("accessToken", data.accessToken);
        ls("userid", data.userid);
        gotohome()
      }
    })
  }

  function handleLogin(event) {
    event.preventDefault();
    login().then(data => {
      if (data.accessToken) {
        console.log(data)
        ls("accessToken", data.accessToken);
        ls("userid", data.userid);
        gotohome()
      }
    })
  }
  
  function gotohome() {
    window.location.href = "/"
  }

  return (
    <div className="container " >
      <div className="jumbotron bg-white col-md-5 m-auto " >
        
        <h1 className="text-dark logo-txt mb-4 " ><b>Discussion App</b></h1>

        <div className=" p-1 " >

          <button className={tab ? "btn btn-dark" : "btn btn-light bg-white"} onClick={() => { settab(true) }} >SignUp</button>
          <button className={!tab ? "btn btn-dark ml-2" : "btn btn-light bg-white ml-2"} onClick={() => { settab(false) }} >LogIn</button>

        </div>
        {tab ?
          <form className="mt-4 px-2" onSubmit={(event) => handleSignup(event)}>
            <div className="form-group ">
              <span >Name</span>
              <input type="text" className="form-control" required name="name" onChange={handleChange} />
            </div>
            <div className="form-group ">
              <span>Email</span>
              <input type="email" className="form-control" required name="email" onChange={handleChange} />
            </div>
            <div className="form-group">
              <span  >Password</span>
              <input type="password" className="form-control" required name="password" onChange={handleChange} />
            </div>

            {err &&
              <span className="text-danger font-weight-bold">Email already exists try to log in. <br /></span>
            }
            <button type="submit" className="mt-2 btn  btn-primary btn-block">
              {loading ? <>Loading...</> : <>SignUp</>}
            </button>
          </form>
          :
          <form className="mt-4 px-2" onSubmit={(event) => handleLogin(event)}>
            <div className="form-group ">
              <span>Email</span>
              <input type="email" className="form-control" required name="email" onChange={handleChange} />
            </div>
            <div className="form-group">
              <span>Password</span>
              <input type="password" className="form-control" required name="password" onChange={handleChange} />
            </div>
            {err &&
              <span className="text-danger font-weight-bold">Incorrect Email or Password. <br /></span>
            }
            <button type="submit" className="mt-2 btn  btn-primary btn-block">
              {loading ? <>Loading...</> : <>LogIn</>}
            </button>
          </form>
        }
      </div>
    </div>
  )
}