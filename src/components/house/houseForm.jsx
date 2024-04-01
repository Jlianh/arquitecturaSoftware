import { useNavigate, useParams } from "react-router-dom";
import { useAddUserMutation, useEditUserMutation, useGetUserByIdQuery, useUploadPhotoMutation } from "../features/userSlice";

import Swal from 'sweetalert2'
import { useState } from "react";

export default function HouseForm() {

    const navigate = useNavigate()
    const param = useParams();

    const [addUser] = useAddUserMutation();

    const [editUser] = useEditUserMutation();

    const [uploadPhoto] = useUploadPhotoMutation();

    const [file, setFile] = useState(null)
    let user;

    const handleAvatar = (e) => {
        setFile(e.target.files);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (param.id) {
            console.log(e)
            const updateUser = {
                identification: e.target.identification.value,
                name: e.target.name.value,
                lastname: e.target.lastname.value,
                email: e.target.email.value,
            }
            editUser({ id: param.id, body: updateUser }).then(
                (response) => {
                    handleUpload(response, "EDIT")
                }
            )
            if (file) {
                const formData = new FormData();
                formData.append("file", file[0])
                console.log({ id: param.id, body: formData });
                uploadPhoto({ id: param.id, body: formData });
            }
        } else {
            const newUser = {
                identification: e.target.identification.value,
                name: e.target.name.value,
                lastname: e.target.lastname.value,
                email: e.target.email.value,
                password: e.target.password.value,
            }
            addUser(newUser).then(
                (response) => {
                    handleUpload(response, "CREATE")
                }
            )
        }
    }

    const handleUpload = (response, action) => {
        switch (action) {
            case 'CREATE':
                console.log(response);
                if (response.data.status == "error") {
                    Swal.fire({
                        icon: "error",
                        title: "El usuario no pudo ser registrado, por favor verifique los datos",
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if (response.data.status == "success") {
                    if (file) {
                        const formData = new FormData();
                        formData.append("file", file[0])
                        console.log({ id: response.data.data._id, body: formData });
                        uploadPhoto({ id: response.data.data._id, body: formData });
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Usuario Creado Correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        navigate('/user')
                    });
                }
                break;
            case 'EDIT':
                if (response.data.status == "error") {
                    Swal.fire({
                        icon: "error",
                        title: "El usuario no pudo ser editado, por favor verifique los datos",
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if (response.data.status == "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Usuario Editado Correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        navigate('/user') // Hacemos la redireccion
                    });
                }
                break;
        }
    }

    if (param.id) {
        const { data, isLoading, isError, error } = useGetUserByIdQuery(param.id);
        if (isLoading) return <div role="status" className='flex justify-center'>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>; else if (isError) return (<div>Error: {error.message}</div>)
        user = data
    }


    return (
        <div className="max w-lg w-full mx-auto px-5 py-5">
            <form onSubmit={handleSubmit} className="bg-red-50 shadow-md rounded pt-6 pb-10 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Identification</label>
                    <input defaultValue={user?.identification} type="number" name="identification" placeholder="Identification" className="shadow appearance-none border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input defaultValue={user?.name} type="text" name="name" placeholder="Name" className="shadow appearance-none border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Last Name</label>
                    <input defaultValue={user?.lastname} type="text" name="lastname" placeholder="Last Name" className="shadow appearance-none border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input defaultValue={user?.email} type="email" name="email" placeholder="Email" className="shadow appearance-none border rounded w-full" />
                </div>

                <div className="mb-4">
                    {!param.id && (<label className="block text-gray-700 font-bold mb-2">Password</label>)}
                    <input defaultValue={user?.password} type={!param.id ? "password" : "hidden"} name="password" placeholder="Password" className="shadow appearance-none border rounded w-full" />
                </div>

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="avatar" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input onChange={handleAvatar} id="avatar" name="avatar" accept="image/png, image/jpeg" type="file" className="hidden" />
                    </label>
                </div>
                <div className="mb-4">
                    <button className="bg-blue-500 hover:bg-blue-700">Save</button>
                </div>
            </form>
        </div>
    )
}