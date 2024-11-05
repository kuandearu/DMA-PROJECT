import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NurseList = () => {
  const[nurses, setNurses] = useState([]);
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const[isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNurses, setFilteredNurses] = useState([]);

    const navigate = useNavigate();
    function handleAddNurse(){
        navigate("/add-nurse");
    }
    function handleUpdateNurse(nurseId){
        navigate(`update-nurse/${nurseId}`);

    }
    function handleDeleteNurse(nurseId){
        const confirm = window.confirm("Do you want to delete", nurseId);
        if(confirm){
            try{
                debugger
                const response = axios.delete(`${apiUrl}/Nurses/${nurseId}`);
                debugger
                setNurses(nurses.filter(nurse => nurse.nurseId !== nurseId));
                setFilteredNurses(filteredNurses.filter(nurse => nurse.nurseId !== nurseId));
                debugger
                console.log("Delete nurse", response.data);
            }catch(error){
                debugger
                console.error("Error delete nurse", error);
            }
        }
        
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const query = e.target.value.toLowerCase();
        setFilteredNurses(nurses.filter((nurse) =>(
                    nurse.name.toLowerCase().includes(query) || nurse.certification.toLowerCase().includes(query)
            ))
        );
    };



    useEffect(() => {
        async function fetchAll(){
            try{
                setIsLoading(true);
                const response = await axios.get(`${apiUrl}/Nurses`);
                console.log("data fetch", response.data);
                setNurses(response.data);
                setFilteredNurses(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                console.error("Fetch nurses error", error);
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
        <h1>Nurse List</h1>
        <input
                type="text"
                placeholder="Search by name or certification"
                value={searchQuery}
                onChange={handleSearch}
                
        />
         I want to have search button, when you click it, it will show the search data
        <table>
            <thead>
                <tr>
                    <td>NurseId</td>
                    <td>Name</td>
                    <td>Certification</td>
                    <td>WardID</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {filteredNurses.length > 0 ? (
                    <>
                    {filteredNurses.map(nurse => (
                        <tr key={nurse.nurseId}>
                            <td>{nurse.nurseId}</td>
                            <td>{nurse.name}</td>
                            <td>{nurse.certification}</td>
                            <td>{nurse.wardId}</td>
                            <td>
                                <button onClick={() => handleUpdateNurse(nurse.nurseId)}>Update</button>
                                <button onClick={() => handleDeleteNurse(nurse.nurseId)}>Delete</button>

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
        <button onClick={handleAddNurse}>Add Nurse</button>
    </div>
  )
}

export default NurseList