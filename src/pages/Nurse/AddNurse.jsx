import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AddNurse = () => {
    
    const[nurse, setNurse] = useState({
        name: '',
        certification: '',
        wardId: ''
    });
    const [wards, setWards] = useState([]);
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch wards data when the component mounts
        async function fetchWards() {
            try {
                const response = await axios.get(`${apiUrl}/Wards`);
                setWards(response.data);
            } catch (error) {
                console.error("Error fetching wards", error);
            }
        }
        fetchWards();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            debugger
            // const nurseData = { ...nurse, wardId: nurse.wardId || null };
            const response = await axios.post(`${apiUrl}/Nurses`, nurse);
            debugger
            console.log("Add Nurse", response.data);
            navigate("/nurse");
        }
        catch(error){
            debugger
            console.error("Error add nurse", error);
        }
    }

    return(
        <div>
            <h1>Add Nurse</h1>
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
                        onChange={(e) => setNurse({ ...nurse, wardId: e.target.value })}
                        required
                >
                    <option> Select Ward</option>
                    
                        {wards.map(ward => (
                            <option key={ward.wardId}>
                                {ward.wardId}
                            </option>
                        ))}

                </select>
                <button type='submit'>Add Nurse</button>
            </form>
        </div>
    )

}

export default AddNurse