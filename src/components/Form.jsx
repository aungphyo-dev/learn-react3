import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useParams} from "react-router-dom";

const Form = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [publish, setPublish] = useState(false)
    const [file, setFile] = useState(null)
    const VisuallyHiddenInput = styled('input')`
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      white-space: nowrap;
      width: 1px;
    `;
    useEffect(() => {
        if (id){
            const getPost = async () => {
                const {data} = await supabase.from('blogs').select(`*`).order('id', {ascending: false}).eq("id",id)
                setTitle(data[0].title)
                setDescription(data[0].description)
            }
            getPost()
        }
    }, []);
    const user_id = JSON.parse(localStorage.getItem("sb-guhrljahuzgrpuvbdiuf-auth-token")).user.id
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (file){
            const fileName = Date.now() + file.name
            await supabase
                .storage
                .from('blogs')
                .upload(`images/${fileName}`, file, {
                    cacheControl: '3600',
                    upsert: true
                })
            const { data } = supabase
                .storage
                .from('blogs')
                .getPublicUrl(`images/${fileName}`)
            const{error} = await supabase.from("blogs").insert([{title:title,description:description,is_published:publish,image:data.publicUrl,user_id:user_id}]).select();
            console.log(error)
            setIsLoading(false)
            setTitle("")
            setDescription("")
        }else {
            const{error} = await supabase.from("blogs").insert([{title:title,description:description,is_published:publish,user_id:user_id}]).select();
            console.log(error)
            setIsLoading(false)
            setTitle("")
            setDescription("")
        }
    }
    return (
        <section className='w-full min-h-screen flex justify-center items-center p-5'>
            <form onSubmit={handleSubmit} className='w-full lg:w-[50%]'>
                <div className='mb-3'>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon/>}
                        href="#file-upload"
                    >
                        Upload a file
                        <VisuallyHiddenInput onChange={e => setFile(e.target.files[0])} type="file"/>
                    </Button>
                </div>
                <div className='mb-3'>
                    <TextField value={title} onChange={e => setTitle(e.target.value)} fullWidth label="Title"
                               id="title"/>
                </div>
                <div className='mb-3'>
                    <TextField value={description} onChange={e => setDescription(e.target.value)} multiline rows={4}
                               fullWidth label="Description" id="description"/>
                </div>
                <div className='flex justify-start items-center gap-x-3'>
                    <FormControlLabel control={<Checkbox/>} value={publish} onChange={() => setPublish(!publish)}
                                      label="Public"/>
                    {isLoading ? <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="outlined"
                    >
                        Save
                    </LoadingButton> : <Button type={"submit"} variant="contained">Post</Button>}
                </div>
            </form>
        </section>
    )
}
export default Form