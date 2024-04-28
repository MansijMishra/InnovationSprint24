"use client"

import { Loader } from "lucide-react"
import { useState } from "react"
import { supabase } from "../utils/supabaseClient"
import { useRouter } from "next/navigation"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const formSubmission = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if(error){
                throw error;
            }
            router.push("/")
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-11/12 h-5/6 md:w-6/12 md:h-3/6 lg:w-4/12 bg-white rounded-lg p-4 flex justify-center items-center">
                <form className="h-5/6 w-11/12 grid grid-rows-6 grid-cols-1" onSubmit={(e) => {
                    e.preventDefault();
                    formSubmission()
                }}>
                    <div className="row-span-1 col-span-1 flex">
                        <p className="font-poppins font-bold text-2xl">Login</p>
                    </div>
                    <div className="row-span-4 col-span-1 flex flex-col gap-4 justify-center">
                        <div className="flex flex-col gap-2">
                            <label className="text-black/70 font-medium font-poppins">Email</label>
                            <input type="email" className="rounded-lg font-redHatText border-2 p-2 bg-transparent w-8/12 border-black/15" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-black/70 font-medium font-poppins">Password</label>
                            <input type="password" className="rounded-lg font-redHatText border-2 p-2 bg-transparent w-8/12 border-black/15" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row-span-1 col-span-1 flex items-center">
                        <button role="submit" className="w-3/12 p-2 rounded-lg bg-black text-white flex items-center justify-center">{isLoading ? <Loader className="w-6 h-6 animate-spin text-white" /> : <p className="font-redHatText font-medium text-white">Login</p>}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;