import React , { useEffect , useState  }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import { Link } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



function LoginComponent() {
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState(null);
  const [passwordData, setPasswordData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleEmailChange = event => {
    setEmailData(event.target.value);
  };
  const handlePasswordChange = event => {
    setPasswordData(event.target.value);
  };
  const routing = useNavigate();

  useEffect(() => {
    if( localStorage.getItem("isAuth") === 'true'){
        navigate(`/admin/posts/`, { replace: true })
    }
    
  },[])

  const login = () => {
    axios.post('http://155.138.136.68/api/login', {
      email: emailData,
      password: passwordData
    }).then(response => {
        localStorage.clear();
        if(response.status === 200) {
            localStorage.setItem('jwt', response.data.access_token)
            localStorage.setItem('isAuth', true);
        } 
        navigate(`/admin/posts/`, { replace: true })
    }).catch(e => {
        console.log(e.response.data.errors)
        setResponseData(e.response.data.errors); 
        localStorage.setItem('isAuth', false);

        if(e.response.status === 401) {
          setError(e.response.data.message);
        } 
             

    });
  }
  return (
    <>  
      <img src="https://www.bookandflytours.com/static/media/booknfly3.8569e48d633fdd633455.png" style={{width:100, display:"block", margin: "20px auto"}}/>

      <div className="shadow-sm loginForm">
            <h3 className='SignInText'>Sign in to you account</h3>
            <div className="formGroup">
              <label >Email / Username</label>
              <input className='form-control w-100' onChange={handleEmailChange} type="text" placeholder="Email or Username"/>
              {responseData ? responseData.email ? <div className='error-msg'>{responseData.email[0]}</div> : '' : ''} 

            </div>
            <div className=" mt-2 formGroup">
            <label  >Password</label>
            <input className='form-control w-100' onChange={handlePasswordChange} type="password" placeholder="password"/>
          
            {responseData ? responseData.password ? <div className='error-msg'>{responseData.password[0]}</div> : '' : ''} 
            </div>
           
            <span className='error-msg'>{error ? error :"" }</span>
            {/* <div className="flex ">
              <input type="checkbox"></input>
              <label style={{marginTop: 6, marginLeft: 10}}>Remember Me</label>
            </div> */}
           
            <button className='btn btn-primary w-100 d-block mt-2' onClick={login}>Login</button>

      </div>
      <Link className='d-block text-center mt-1 forgotpasswordLink' to="/">Don't have account. Register Now</Link>
    </>
  );
}

export default LoginComponent;
