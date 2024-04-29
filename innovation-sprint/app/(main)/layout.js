"use client"
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { GitPullRequest, LayoutDashboard } from 'lucide-react';

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            
            console.log(data)

            if (error) {
              console.error('Error fetching user:', error.message);
              router.push('/login');
            } else if (!data.user) {
              router.push('/login');
            } else {
              setIsLoading(false);
            }
          };
      
          checkUser();
    }, [])

    if(isLoading) {
        return <div className="w-full h-screen flex bg-white justify-center items-center"><Loader className="w-10 h-10 animate-spin text-black" /></div>
    }

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full grid grid-cols-8 grid-rows-1">
                <div className="col-span-1 row-span-1 bg-black">
                    <div className="w-10/12 mx-auto h-full flex flex-col gap-4 pt-4">
                        <div onClick={() => router.push('/')} className={clsx("flex items-center gap-2 cursor-pointer", pathName.endsWith('/') ? "text-white" : "text-white/70 hover:text-white transition-colors")}>
                            <LayoutDashboard className={clsx("w-6 h-6")} />
                            <p className="text-lg font-redHatText font-medium">Dashboard</p>
                        </div>
                        <div onClick={() => router.push('/requests')} className={clsx("flex items-center gap-2 cursor-pointer", pathName.endsWith('/requests') ? "text-white" : "text-white/70 hover:text-white transition-colors")}>
                            <GitPullRequest className={clsx("w-6 h-6")} />
                            <p className="text-lg font-redHatText font-medium">Requests</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-7 row-span-1">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Layout;