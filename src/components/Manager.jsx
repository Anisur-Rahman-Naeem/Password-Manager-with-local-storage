import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("password")
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/hide_eye.png")) {
            ref.current.src = "icons/show_eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/hide_eye.png"
            passwordRef.current.type = "text"

        }
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }

    const savePassword = () => {
        if (form.site.length >3 && form.username.length > 3 && form.password.length > 3) {
            
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }
        else{
            toast('Error: Password not saved!')
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
            // console.log([...passwordArray, form])
        }
    }

    const editPassword = (id) => {
        toast('Password Edited!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log("Editing password with id ", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id != id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            </div>
            <div className="p-3 md:mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-green-700">&lt;</span>

                    <span>Pass</span><span className="text-green-500">OP/ &gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>


                <div className="flex flex-col p-4 text-black gap-6 items-center max-w-4xl mx-auto">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='bg-white rounded-full border border-green-500 w-full p-4 py-2 shadow-sm' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='bg-white rounded-full border border-green-500 flex-1 p-4 py-2 shadow-sm' type="text" name='username' id='username' />
                        <div className="relative flex-1">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='bg-white rounded-full border border-green-500 w-full p-4 pr-14 py-2 shadow-sm' type="password" name='password' id='password' />
                            <span className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'><img ref={ref} className='w-5 h-5' src="icons/show_eye.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/psyssele.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords max-w-5xl mx-auto">
                    <h2 className='font-bold text-2xl py-4 text-left'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-fixed w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center min-w-0'>
                                        <div className='inline-flex items-center justify-center gap-2' onClick={() => copyText(item.site)}>
                                            <a href={item.site} target='_blank' className='truncate text-sm'>{item.site}</a>
                                            <img className='w-4 h-4 cursor-pointer' src="icons/copy.png" alt="copy site" />
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center min-w-0'>
                                        <div className='inline-flex items-center justify-center gap-2' onClick={() => copyText(item.username)}>
                                            <span className='truncate text-sm'>{item.username}</span>
                                            <img className='w-4 h-4 cursor-pointer' src="icons/copy.png" alt="copy username" />
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center min-w-0'>
                                        <div className='inline-flex items-center justify-center gap-2' onClick={() => copyText(item.password)}>
                                            <span className='truncate text-sm'>{item.password}</span>
                                            <img className='w-4 h-4 cursor-pointer' src="icons/copy.png" alt="copy password" />
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center min-w-0'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
