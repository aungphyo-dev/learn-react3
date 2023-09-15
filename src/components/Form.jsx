import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/index.js";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useParams} from "react-router-dom";

const Form = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [updateUrl,setUpdateUrl] = useState("")
    const [previewUrl,setPreviewUrl] = useState("")
    const [category,setCategory] = useState("")
    const [categories,setCategories] = useState([])
    const publish = true;
    const imagePreview = (file)=>{
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setPreviewUrl(reader.result)
        }
    }
    useEffect(() => {
        if (file){
            imagePreview(file)
        }
    }, [file]);
    const getPost = async () => {
        const {data} = await supabase.from('blogs').select(`*`).order('id', {ascending: false}).eq("id",id)
        setTitle(data[0].title)
        setDescription(data[0].description)
        setUpdateUrl(data[0].image)
        setPreviewUrl(data[0].image)
        setCategory(data[0].category_id)
    }
    const getCate =async () => {
        const {data} = await supabase.from('categories').select(`*`)
        setCategories(data)
    }

    useEffect(() => {
        if (id){
            getPost()
        }
        getCate()
    }, []);
    const user_id = JSON.parse(localStorage.getItem("sb-rvfstgyjufrxnaindhkb-auth-token")).user.id
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (id){
            if(file){
                const {error} = await supabase
                    .storage
                    .from('blogs')
                    .update(`${updateUrl.substr(72)}`, file, {
                        cacheControl: '3600',
                        upsert: true
                    })
                    console.log(error)
                    await supabase
                    .from('blogs')
                    .update({
                        title : title,
                        description : description
                    })
                    .eq('id', id)
                    setIsLoading(false)
                    setTitle("")
                    setDescription("")
                    setPreviewUrl("")
            }else {
                await supabase
                    .from('blogs')
                    .update({
                        title : title,
                        description : description
                    })
                    .eq('id', id)
                    setIsLoading(false)
                    setTitle("")
                    setDescription("")
                    setPreviewUrl("")
            }
        }else {
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
                setPreviewUrl("")
            }else {
                const{error} = await supabase.from("blogs").insert([{title:title,description:description,is_published:publish,user_id:user_id}]).select();
                console.log(error)
                setIsLoading(false)
                setTitle("")
                setDescription("")
                setPreviewUrl("")
            }
        }
    }
    return (
        <section className='w-full min-h-screen flex justify-center items-center p-5 pt-[85px]'>
            <form onSubmit={handleSubmit} className='w-full lg:w-[50%]'>
                <div className='mb-3'>
                    <div className="flex items-center justify-center w-full ">
                        <label htmlFor="dropzone-file" className="flex relative flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" onChange={e=>setFile(e.target.files[0])} className="hidden" />
                                <img src={previewUrl} className='absolute inset-0 z-10' alt=""/>
                        </label>
                    </div>
                </div>
                <div className='mb-3'>
                    <TextField value={title} onChange={e => setTitle(e.target.value)} fullWidth label="Title"
                               id="title"/>
                </div>
                <div className="mb-3">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={e=>setCategory(e.target.value)}
                        >
                            {
                                categories?.map(category => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='mb-3'>
                    <TextField value={description} onChange={e => setDescription(e.target.value)} multiline rows={4}
                               fullWidth label="Description" id="description"/>
                </div>
                <div className='flex justify-start items-center gap-x-3'>
                    {isLoading ? <LoadingButton
                        loading
                        fullWidth
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="outlined"
                    >
                        Waiting....
                    </LoadingButton> : <Button type={"submit"} fullWidth variant="contained">Post</Button>}
                </div>
            </form>
        </section>
    )
}
export default Form