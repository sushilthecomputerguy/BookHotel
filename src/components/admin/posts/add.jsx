import React , { useEffect , useState  }  from 'react';
import Button from 'react-bootstrap/Button';
import axios from '../../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from '../header/header';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';



function PostsComponent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [getcategories, setGetCategories] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const token = localStorage.getItem("jwt");


  useEffect(() => {
    axios.get('http://155.138.136.68/api/categories')
      .then((response) => {
        console.log(response.data)
        setGetCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
        if(error){
            if(error.response.status === 401){
     localStorage.removeItem('jwt')
            localStorage.removeItem('isAuth');

                          navigate(`/login`, { replace: true })
            }

          }
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((c) => c !== category));
    }
  };



const handleSubmit = (event) => {
  event.preventDefault();
  const data = { title, content, categories: categories.map((c) => parseInt(c)) };
  axios.post('http://155.138.136.68/api/posts', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      navigate(`/admin/posts/`, { replace: true })

      toast.success('Post submitted successfully!');
      console.log(response);
    })
    .catch((error) => {
      toast.error('Error submitting post.');
      setResponseData(error.response.data.errors); 

      console.error(error);
      
    });
};
  return (
    <>
        <HeaderComponent />

      <div className="shadow-sm loginForm mt-3" >
         <div className="dashboard-box-header">
            <h2 className='m-0'>Create New Post</h2>
        </div>
       
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <input className='form-control' type="text" value={title} onChange={handleTitleChange} />
            {responseData ? responseData.title ? <div className='error-msg'>{responseData.title[0]}</div> : '' : ''} 

            

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <textarea className='form-control w-100 d-block' value={content} onChange={handleContentChange} />
            {responseData ? responseData.content ? <div className='error-msg'>{responseData.content[0]}</div> : '' : ''} 

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
              
              {getcategories.map((category) => (
                <div key={category.id}>
                  <input
                    
                    type="checkbox"
                    value={category.id}
                    onChange={handleCategoryChange}
                    checked={categories.includes(category.id)}
                  />
                  &nbsp; {category.name}
                  <br />
                </div>
              ))}
              {responseData ? responseData.categories ? <div className='error-msg'>{responseData.categories[0]}</div> : '' : ''} 
      
          
          </Form.Group>
          <Button className='w-100 mt-3 btn btn-primary'  variant="primary" type="submit">Submit</Button>
        </form>
      </div>
      <ToastContainer />

    </>
  );
}

export default PostsComponent;
