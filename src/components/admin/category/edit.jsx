import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import HeaderComponent from '../header/header';
import Form from 'react-bootstrap/Form';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';


function CategoryEditComponent () {
   const [category, setCategory] = useState({ name: '' });
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();


    const { id } = useParams();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make a GET request to fetch the data for the specified category ID
      const response = await axios.get(`http://155.138.136.68/api/categories/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if(error){
        if(error.response.status === 401){
          localStorage.setItem('isAuth', false );
            navigate(`/login`, { replace: true })
          }
      }
    }
  };

  const handleInputChange = (e) => {
    // Update the category object when the input changes
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the category with the new data
      await axios.put(`http://155.138.136.68/api/categories/${id}`,category,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      navigate(`/admin/category/`, { replace: true })
          toast.success('Category Edit successfully!');
          console.log('Category updated successfully!');
    } catch (e) {
      console.error('Error updating category:', e);
                toast.error('Error Category Edit!');

      setResponseData(e.response.data.errors); 
      if(e){
            if(e.response.status === 401){
     localStorage.removeItem('jwt')
            localStorage.removeItem('isAuth');

                          navigate(`/login`, { replace: true })
            }

          }
    }
  };

  return (
    <>
        <HeaderComponent />

      <div className="shadow-sm loginForm mt-3" >
      <h2>Edit Category</h2>
      <form onSubmit={handleFormSubmit}>
        <Form.Group>
        <Form.Label>Name</Form.Label>
          <input
            className='form-control'
            type="text"
            name="name"
            value={category.name}
            onChange={handleInputChange}
          />
          {responseData ? <div className='error-msg'>{responseData.name[0]}</div> : ''} 

        </Form.Group>
        <button className='btn btn-primary w-100 mt-2' type="submit">Save Changes</button>
      </form>
    </div>
    </>
  );
}

export default CategoryEditComponent;