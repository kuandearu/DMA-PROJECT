import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UpdateWard = () => {
  const {wardId} = useParams(); 
  const[ward, setWard] = useState({
    name: '',
    capacity: ''
  });
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWard(){
        try{
            const response = await axios.get(`${apiUrl}/Wards/${wardId}`);
            console.log("Fetch Ward", response.data);
            setWard(response.data);
        }catch(error){
            console.error("Error fetch ward", error);
        }
    }
    fetchWard();
}, [apiUrl, wardId])

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        debugger
        const response = await axios.put(`${apiUrl}/Wards/${wardId}`, ward, {
            headers: {
                "Content-Type": "Application/json",
                "Accept": "*/*"
            }
        });
        debugger
        console.log("Update successfully",response.data);
        navigate("/ward");
    }catch(error){
        debugger
        console.error("Error update nurse", error);
    }
}
  return (
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
          
          <button type='submit'>Update Ward</button>
      </form>
  </div>
  )
}

export default UpdateWard