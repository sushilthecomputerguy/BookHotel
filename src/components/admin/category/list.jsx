import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from '../header/header';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function CategoryListComponent() {
   const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
const token = localStorage.getItem("jwt");
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://155.138.136.68/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual token
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
       if(error){
            if(error.response.status === 401){
             localStorage.removeItem('jwt')
            localStorage.removeItem('isAuth');

                          navigate(`/login`, { replace: true })
            }

          }
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(
        'http://155.138.136.68/api/categories',
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        }
      );

      setNewCategory('');
      toast.success('Category created successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error.message);
              setResponseData(error.response.data.errors); 

      toast.error('Error creating category. Please try again.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://155.138.136.68/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast.error('Error deleting category. Please try again.');
       
    }
  };

  return (
    <>
        <HeaderComponent />

 <div>
     
      <div className="shadow-sm loginForm mt-3">
         <h2>Categories</h2>
         <Form.Group className="mt-3" >
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          className='form-control'
          onChange={(e) => setNewCategory(e.target.value)}
        />
                {responseData ? <div className='error-msg'>{responseData.name[0]}</div> : ''} 
</Form.Group>
        <Form.Group className="mt-3" >
          <button className='w-100 btn btn-primary' onClick={handleCreateCategory}>Create Category</button>

        </Form.Group>
        
      </div>
    
        {categories.map((category) => (
          <div className="shadow-sm loginForm mt-3" >
          <div key={category.id}>
            {category.name}
            
            <Link to={`/admin/category/${category.id}`}><button className='btn btn-primary float-right'>Edit</button></Link>
            <button className='btn btn-danger float-right' onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </div>
          </div>
        ))}
      
      <ToastContainer />
    </div>
       

    </>
  );
}

export default CategoryListComponent;
