import authservice from './appwrite/authservice'
import { login,logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'
 //console.log(import.meta.env.VITE_APPWRITE_URL);
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()
  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData)
      {
        console.log(userData);
      dispatch(login({userData}))
      
      } //by default it is written as {userData:userData}
      else
      dispatch(logout())
    }) 
    .finally(()=>setLoading(false))   
    
  }, [])

  //******************conditional rendering********
 return !loading?
<div className='min-h-screen flex flex-wrap content-between bg-grey-400'>
<div className='w-full block'>
 <Header/>
 <main>
   <Outlet/>
 </main>
 <Footer/>
</div>
</div>
 :
 null
}

export default App
