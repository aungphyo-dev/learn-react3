import Form from "./components/Form.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Index.jsx";
import Navbar from "./components/Navbar.jsx";
import Detail from "./components/Detail.jsx";
import AuthForm from "./components/AuthForm.jsx";
import 'flowbite';
import {useEffect, useState} from "react";
import {supabase} from "./supabase/index.js";
function App() {
    const [user,setUser] = useState(false)
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session !== null){
                setUser(true)
            }else {
                setUser(false)
            }
        })
    }, []);
  return (
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        {
                            user && (<Route path='/create' element={<Form/>}/>)
                        }
                        {
                            !user && <Route path='/signup' element={<AuthForm/>}/>
                        }
                        {
                            !user && <Route path='/login' element={<AuthForm/>}/>
                        }
                        <Route path='/detail/:id' element={<Detail/>}/>
                    </Routes>
                </BrowserRouter>
  )
}

export default App
