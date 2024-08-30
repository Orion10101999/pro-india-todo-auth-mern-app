import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ShowTodos = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/todo/showtodos`);
                console.log(response.data);
                setTodos(response.data);
            } catch (err) {
                console.log(err);
            } 
        };
        
        fetchTodos();
    }, []);
    const handleDelete = (id) => {
      navigate(`/deletetodo/${id}`);
    };
    
    const handleUpdate = (id) => {
      navigate(`/updatetodo/${id}`);
    };
    
    
    return (
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Todo List</h1>
  <ul className="space-y-4">
    {todos.map(todo => (
      <li key={todo._id} className="bg-gray-200 shadow-md rounded-md p-4">
        <h2 className="text-xl font-semibold">Title : {todo.title}</h2>
        <p>Description : {todo.description}</p>
        <p>Status: {todo.status}</p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => handleUpdate(todo._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(todo._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>

  <div className='flex gap-2 mt-5'>
        <p>Go to Home Page : </p>
        <Link to={'/'}>
          <span className='text-blue-700'>Click Here</span>
        </Link>
      </div>
</div>
  )
}

export default ShowTodos
