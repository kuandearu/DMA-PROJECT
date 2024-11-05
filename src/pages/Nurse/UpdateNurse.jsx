import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateNurse = () => {
    const {nurseId} = useParams();
    const[nurse, setNurse] = useState({
        name: '',
        certification: '',
        wardId: ''
    });
    const[wards, setWards] = useState([]);
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchNurse(){
            try{
                const response = await axios.get(`${apiUrl}/Nurses/${nurseId}`);
                console.log("Fetch Nurse", response.data);
                setNurse(response.data);
            }catch(error){
                console.error("Error fetch nurse", error);
            }
        }

        async function fetchWards(){
            try{
                const response = await axios.get(`${apiUrl}/Wards`);
                setWards(response.data);
            }
            catch(error){
                console.error("Error fetch wards", error);
            }
        }
        fetchNurse();
        fetchWards();
    }, [apiUrl, nurseId])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            debugger
            const response = await axios.put(`${apiUrl}/Nurses/${nurseId}`, nurse, {
                headers: {
                    "Content-Type": "Application/json",
                    "Accept": "*/*"
                }
            });
            debugger
            console.log("Update successfully",response.data);
            navigate("/nurse");
        }catch(error){
            debugger
            console.error("Error update nurse", error);
        }
    }
  return (
    <div>
    <h1>Update Nurse</h1>
    <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text"
                value={nurse.name}
                onChange={(e) => {setNurse({...nurse, name: e.target.value})}}
                required 
        />
        <label>Certification</label>
        <input type="text"
                value={nurse.certification}
                onChange={(e) => {setNurse({...nurse, certification: e.target.value})}}
                required 
        />
        <label>WardId</label>
        <select value={nurse.wardId}
                onChange={(e) => setNurse({...nurse, wardId: e.target.value})}
                required>
            <option>Select wardId</option>
            {wards.map(ward => (
                <option key={ward.wardId}>
                    {ward.wardId}
                </option>
            ))}
        </select>
        <button type='submit'>Update Nurse</button>
    </form>
</div>
  )
}

export default UpdateNurse