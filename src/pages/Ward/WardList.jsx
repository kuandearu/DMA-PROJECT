import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const WardList = () => {
    const[wards, setWards] = useState([]);
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const[isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    function handleAddWard(){
        navigate("/add-ward");
    }
    function handleUpdateWard(wardId){
        navigate(`update-ward/${wardId}`);

    }
    function handleDeleteWard(wardId){
        const confirm = window.confirm("Do you want to delete", wardId);
        if(confirm){
            try{
                debugger
                const response = axios.delete(`${apiUrl}/Wards/${wardId}`);
                debugger
                setWards(wards.filter(ward => ward.wardId !== wardId));
                debugger
                console.log("Delete ward", response.data);
            }catch(error){
                debugger
                console.error("Error delete ward", error);
            }
        }
        
    }



    useEffect(() => {
        async function fetchAll(){
            try{
                setIsLoading(true);
                const response = await axios.get(`${apiUrl}/Wards`);
                console.log("data fetch", response.data);
                setWards(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                console.error("Fetch Wards error", error);
            }
            
        }
        fetchAll();
        
    }, []);
    if(isLoading == true){
        return(
            <p>
                Data is loading
            </p>
        )
    }
    return (
    <div>
        <h1>Ward List</h1>
        <table>
            <thead>
                <tr>
                    <td>WardId</td>
                    <td>Name</td>
                    <td>Capacity</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {wards.length > 0 ? (
                    <>
                    {wards.map(ward => (
                        <tr key={ward.nurseId}>
                            <td>{ward.wardId}</td>
                            <td>{ward.name}</td>
                            <td>{ward.capacity}</td>
                            <td>
                                <button onClick={() => handleUpdateWard(ward.wardId)}>Update</button>
                                <button onClick={() => handleDeleteWard(ward.wardId)}>Delete</button>

                            </td>
                        </tr>
                    ))}
                    </>
                ) : (
                    <p>
                        No data found
                    </p>
                )}
            </tbody>
        </table>
        <button onClick={handleAddWard}>Add Ward</button>
    </div>
  )
}

export default WardList