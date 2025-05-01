import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Protect() {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate('/tasks');
        }
    },[])
  
}

export default Protect
