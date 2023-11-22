import React , { useEffect , useState  }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.scss';
import { Link } from 'react-router-dom';
  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



function HomeComponent() {
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
    // if( localStorage.getItem("isAuthenticated")){
    //   routing(`/admin/dashboard`, { replace: true })
    // }
    
  },[])

  const login = () => {
    axios.post('http://155.138.136.68/api/login', {
      email: emailData,
      password: passwordData
    }).then(response => {
        localStorage.clear();

          console.log( response.data.access_token)
        localStorage.setItem('isAuthenticated', true);
         if(response.status === 200) {
           localStorage.setItem('jwt', response.data.access_token);
         
        } 
        navigate(`/admin/posts/`, { replace: true })
    }).catch(e => {
        console.log(e.response.data.errors)
        setResponseData(e.response.data.errors); 

        if(e.response.status === 401) {
          setError(e.response.data.message);
        } 
                // setResponseData(e.response.data.errors.email[0]); 

        // toast.error(e.response.data, {position: "top-right",autoClose: 5000,
        // hideProgressBar: true,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined});


    });
  }
  return (
    <>  
    <div className="header">
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">      <img src="https://www.bookandflytours.com/static/media/booknfly3.8569e48d633fdd633455.png" style={{width:60, display:"block", margin: "20px auto"}}/>
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="" id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin/posts">Posts</Nav.Link>
            <Nav.Link href="/admin/category">Category</Nav.Link>
            <Link to="/login"><Button variant="primary">Login</Button></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
     
    <div className="bluebox"></div>
    <div className="p-4" >
<div className="searchBox" style={{"borderRadius":"8px"}}> 
      <h3 className='text-center bookstay'>Book your amazing stay with us</h3>
      <div class="bookingGrid">
                    <div class="placeName">
                        <span class="bookingLabel">City Name or Location</span>
                        <span class="bookingInput">Kathmandu</span>
                    </div>
                    <div class="CheckIn">
                        <span class="bookingLabel">Check In</span>
                        <span class="bookingInput">22 Nov'23</span>
                    </div>
                    <div class="CheckOut">
                        <span class="bookingLabel">Check Out</span>
                        <span class="bookingInput">25 Nov'23</span>
                    </div>
                    <div class="GuestNo">
                        <span class="bookingLabel">Room and Guest</span>
                        <span class="bookingInput">1 Room 2 Adult</span>
                    </div>
                </div>
                <button class="bookingSearchBtn">Search</button>

    </div>
    </div>
    
    </>
  );
}

export default HomeComponent;
