import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import HeaderComponent from '../header/header';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostEdit() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [getcategories, setGetCategories] = useState([]);
  const [responseData, setResponseData] = useState(null);
   const [categoryIds, setCategoryIds] = useState([]);
  const [render, setRender] = useState(false)


  const { id } = useParams();
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {


    axios.get(`http://155.138.136.68/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategories(response.data.categories);
        const idsToAdd = response.data.categories.map(category => category.id);
        setCategoryIds(prevIds => [...prevIds, ...idsToAdd]);

      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://155.138.136.68/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
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
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event) => {




    const selectedCheckboxes = categoryIds;
        const findIdx = selectedCheckboxes.indexOf(parseInt(event.target.value));
        if(findIdx > -1){ 
            selectedCheckboxes.splice( findIdx, 1)
        }else{
            selectedCheckboxes.push(parseInt(event.target.value));
        }
        setCategoryIds(selectedCheckboxes)
     setRender(!render)
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title, content, categories: categoryIds };
    axios.put(`http://155.138.136.68/api/posts/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )
      .then((response) => {
          navigate(`/admin/posts/`, { replace: true })
          toast.success('Post Edit successfully!');
      })
      .catch((error) => {

        setResponseData(error.response.data.errors); 
        console.error(error);
          
      });
  };
  return ( 
    <>
    <HeaderComponent />
    <div className="shadow-sm loginForm mt-3" >
      <h2>Edit Posts</h2>

      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label>Title</Form.Label>
            <input type="text" className='form-control' value={title} onChange={handleTitleChange} />
            {responseData ? responseData.title ? <div className='error-msg'>{responseData.title[0]}</div> : '' : ''} 

        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Content</Form.Label>
            <textarea className='form-control' value={content} onChange={handleContentChange} />
            {responseData ? responseData.content ? <div className='error-msg'>{responseData.content[0]}</div> : '' : ''} 
        </Form.Group>
        <Form.Group className="mb-3">

         <label>
              <b>Categories:</b>
              <br />
              {getcategories.map((category) => (
                <React.Fragment key={category.id}>
                  <input
                    type="checkbox"
                    value={category.id}
                    onChange={handleCategoryChange}
                    checked={categoryIds.includes(category.id)}
                  />
                  &nbsp; {category.name}
                  <br />
                </React.Fragment>
              ))}
            {responseData ? responseData.categories ? <div className='error-msg'>{responseData.categories[0]}</div> : '' : ''} 

            </label>
            
          </Form.Group>
            <br />
            <button className='w-100 mt-3 btn btn-primary' type="submit">Save</button>
      </form> 
    </div>
    </>
  );
}

export default PostEdit;