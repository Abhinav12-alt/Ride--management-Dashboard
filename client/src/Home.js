// import React,{useEffect,useState} from 'react'
// import axios
//  from 'axios'

function Home() {
  // const[auth,setAuth]=useState(false)
  // const[name,SetName]=useState('')
  // const[message,SetMessage]=useState('')
  // useEffect(()=>{
  //   axios.get('http://localhost:3001/')
  //   .then(res=>{
  //     if(res.data.status ==="Success"){
  //     setAuth(true);
  //     SetName(res.data.name);
  //     }else{
  //       SetMessage(res.data.Message);
  //     }
  //     })
  //   },[])
  

  return (
    
    <div>
      
      {/* {
        auth ?
        <div>
          <h3>Your are Authorized{name}</h3>
          <button className='btn btn-danger'>Logout</button>
        </div>:
        <div>
          <h3>{message}</h3>
          <h3>Login now</h3>
        </div>
} */}
     <img id ="imgg"src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWUlMjBwYWdlfGVufDB8fDB8fHww"></img>
    </div>
      
  )
}

export default Home
