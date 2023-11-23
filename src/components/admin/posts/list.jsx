import React , { useEffect , useState  }  from 'react';
import axios from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from '../header/header';
import Pagination from 'react-bootstrap/Pagination';


function NoteListComponent() {
let items = [];

  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState([]);
  const [nextpage, setNextpage] = useState([]);
  const [prevpage, setPrevpage] = useState([]);

  const fetchPosts = async () => {
        try {
          const response = await axios.get(`http://155.138.136.68/api/posts?page=${pageNo}`);

          setPosts(response.data.data);

           // setTotal(  );
           if( parseInt(response.data.total / response.data.per_page) > 1){
              const numberOfTimes = parseInt(response.data.total / response.data.per_page) + 1; // Change this to the desired number of iterations

           }else{
             const numberOfTimes = 1
           }

          const numberOfTimes = parseInt(response.data.total / response.data.per_page) + 1; // Change this to the desired number of iterations

          // Create an array with the desired length using Array.from
          setTotal( Array.from({ length: numberOfTimes }, (_, index) => index));
          if(response){
            if(response.data.next_page_url !== null){
                    const nexturlParams = new URL(response.data.next_page_url);
                  setNextpage(nexturlParams.searchParams.get('page'));
              }
             
           
              if(response.data.prev_page_url !== null){
                  const prevurlParams = new URL(response.data.prev_page_url);
                  setPrevpage(prevurlParams.searchParams.get('page'));
              }
             

          }
         

        } catch (error) {
          console.error('Error fetching categories:', error.message);
        //  if(error){
     //        if(error.response.status === 401){
     // localStorage.removeItem('jwt')
     //        localStorage.removeItem('isAuth');

     //                      navigate(`/login`, { replace: true })
     //        }

      //    }
        }
  };





    const handleDeleteCategory = async (postId) => {
      try {
        await axios.delete(`http://155.138.136.68/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast.error('Error deleting category. Please try again.');
      
     
    }
  };



 useEffect(() => {
    fetchPosts();
  }, [pageNo]);



  return (
    <>
    <HeaderComponent />
    <div style={{"width":"400px","display":"block","margin":"auto"}}>
      <Row>
        <Col lg={6} sm={6}> <h3>Posts</h3></Col>
        <Col lg={6} sm={6}>
           <Link to="/admin/posts/add"><Button className='float-right' variant="primary">Create Posts</Button></Link>
           </Col>
      </Row>
    </div>


   
    {posts.map((post) => (
      <div key={post.id} className="shadow-sm loginForm mt-3" >
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <ul>
                {post.categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
              <Row>
                <Col lg={6} sm={6}>
                  <Link to={`/admin/posts/edit/${post.id}`}><Button variant="primary" className='w-100'>Edit Posts</Button></Link>
                </Col>
                <Col lg={6} sm={6}>
                  <Button variant="danger" className='w-100' onClick={() => handleDeleteCategory(post.id)}>Delete Posts</Button>
                </Col>
              </Row>
              
              
            </div>
            </div>  


      ))} 
    

      <div className="d-block mx-auto" style={{"width":"200px"}}>
    
    <Pagination className=" mx-auto">
      {prevpage !== null ? 
      <Pagination.Prev onClick={() => setPageNo(prevpage)} /> : ""
      }

 {total.map((item, index) => (
         

          <Pagination.Item onClick={() => setPageNo(index+1)} key={index+1}  active={index+1 == pageNo}>
      {index + 1}
    </Pagination.Item>

        ))}
  {nextpage !== null ? 
      <Pagination.Next onClick={() => setPageNo(nextpage)} /> : ""
      }

             

  </Pagination>

    </div>  

       

    </>
  );
}

export default NoteListComponent;
