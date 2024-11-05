import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddWard = () => {
  const[ward, setWard] = useState({
    name: '',
    capacity: ''
  });
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();


   const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            debugger
            const response = await axios.post(`${apiUrl}/Wards`, ward);
            debugger
            console.log("Add Ward", response.data);
            navigate("/ward");
        }
        catch(error){
            debugger
            console.error("Error add ward", error);
        }
    }

    return(
        <div>
            <h1>Add Ward</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text"
                        value={ward.name}
                        onChange={(e) => {setWard({...ward, name: e.target.value})}}
                        required 
                />
                <label>Capacity</label>
                <input type="text"
                        value={ward.capacity}
                        onChange={(e) => {setWard({...ward, capacity: e.target.value})}}
                        required 
                />
                
                <button type='submit'>Add Ward</button>
            </form>
        </div>
    )
}

export default AddWard