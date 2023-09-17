import {supabase} from "../supabase/index.js";
import {useEffect, useState} from "react";

const UserModal = ({modal,setMoal,user_id}) => {
    const [name,setName] = useState("")
    const [file,setFile] = useState(null)
    const [initial,setInitaial] = useState(false)
    const [wait,setWait] = useState(false)
    const [url,setUrl] = useState("")
    useEffect(() => {
        const getUser = async () => {
            setInitaial(true)
            const {data,error} = await supabase.from("user_profiles").select("*").eq("user_id",user_id);
            console.log(data)
            if (error === null){
                setName(data[0]?.name)
                setUrl(data[0]?.image)
                setInitaial(false)
            }
        }
            getUser()
    }, [modal]);
    const handleSubmit = async  (e)=>{
        setWait(true)
        e.preventDefault()
        if (file){
            if(url === "https://rvfstgyjufrxnaindhkb.supabase.co/storage/v1/object/public/blogs/users/user.png"){
                const fileName = Date.now() + "_" + "*" + "_" + file.name;
                await supabase.storage.from('blogs').upload(`users/${fileName}`, file, {cacheControl: '3600', upsert: false})
                const { data } = supabase.storage.from('blogs').getPublicUrl(`users/${fileName}`)
                await supabase.from("user_profiles").update({name:name, image:data.publicUrl}).eq("user_id",user_id)
                setWait(false)
                setMoal(false)
            }else {
                const  d = await supabase.storage.from('blogs').upload(`${url.substr(72)}`, file, {cacheControl: '3600', upsert: true})
                console.log(url.substr(72))
                console.log(d)
                const { data } = supabase.storage.from('blogs').getPublicUrl(`${url.substr(72)}`)
                await supabase.from("user_profiles").update({name:name, image:data.publicUrl}).eq("user_id",user_id)
                setWait(false)
                setMoal(false)
            }
        }else {
            await supabase.from("user_profiles").update({name:name,}).eq("user_id",user_id)
            setWait(false)
            setMoal(false)
        }
    }
  return(
      <div id="defaultModal" tabIndex="-1" className="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed  z-50 w-full inset-0 h-modal h-full">
          <div className="relative p-4 w-full max-w-2xl h-auto">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  {
                      initial && <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                          <span className="font-medium">Info alert!</span> Wait for user data.
                      </div>
                  }
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Edit User
                      </h3>
                      <button onClick={()=>setMoal(!modal)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 mb-4 grid-cols-1">
                          <div>
                              <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                              <input type="file" onChange={e=>setFile(e.target.files[0])}  name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                          </div>
                          <div>
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                              <input type="text" name="name" value={name} onChange={e=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name" required=""/>
                          </div>
                      </div>
                      <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                          {
                              wait ? "Updating...." : "Update User"
                          }
                      </button>
                  </form>
              </div>
          </div>
      </div>
  )
}
export default UserModal

