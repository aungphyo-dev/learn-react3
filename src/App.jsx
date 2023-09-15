import Form from "./components/Form.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Index.jsx";
import Navbar from "./components/Navbar.jsx";
import Detail from "./components/Detail.jsx";
import AuthForm from "./components/AuthForm.jsx";
import {useEffect, useState} from "react";
import {supabase} from "./supabase/index.js";
import Profile from "./components/Profile.jsx";
import Error from "./components/Error.jsx";
function App() {
    const [In,setIn] = useState(false)
    console.log(In)
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session !== null){
                setIn(true)
            }else {
                setIn(false)
            }
        })
    }, []);
    const user = localStorage.getItem("sb-rvfstgyjufrxnaindhkb-auth-token")
  return (
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        {
                            user && (<Route path='/create' element={<Form/>}/>)
                        }
                        {
                            user && (<Route path='/edit/:id' element={<Form/>}/>)
                        }
                        {
                            !user && <Route path='/signup' element={<AuthForm/>}/>
                        }
                        {
                            !user && <Route path='/login' element={<AuthForm/>}/>
                        }
                        {
                            user && <Route path='/profile/:slug'  element={<Profile/>}/>
                        }
                        <Route path='/detail/:id' element={<Detail/>}/>
                        <Route path={"*"} element={<Error/>}/>
                    </Routes>
                </BrowserRouter>
  )
}

export default App
