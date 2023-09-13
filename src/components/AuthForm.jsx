import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save.js";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";
import {useLocation, useNavigate} from "react-router-dom";

const AuthForm = () => {
    const {pathname} = useLocation()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const nav = useNavigate()
    const handleSubmit =async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (pathname==="/signup"){
            const {error} = await supabase.auth.signUp({email:email,password:password});
            setIsLoading(false)
            if (error === null){
                nav("/")
            }
        }else if (pathname==="/login"){
            const {error} = await supabase.auth.signInWithPassword({email:email,password:password});
            setIsLoading(false)
            if (error === null){
                nav("/")
            }
        }
    }
  return(
      <section className='w-full min-h-screen flex justify-center items-center p-5'>
          <form onSubmit={handleSubmit} className='w-full lg:w-[50%]'>
              <div className='mb-3'>
                  <TextField value={email} onChange={e=>setEmail(e.target.value)} fullWidth label="Email" id="email"/>
              </div>
              <div className='mb-3'>
                  <TextField value={password} onChange={e=>setPassword(e.target.value)} fullWidth label="Password" id="password"/>
              </div>
              {isLoading ? <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
              >
                  Loading....
              </LoadingButton> : <Button type={"submit"} variant="contained">{pathname==="/signup"?"Sign Up":"Login"}</Button>}
          </form>
      </section>
  )
}
export default AuthForm