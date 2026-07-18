import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideBar from './SideBar'
const AdminLayout = () => {
  const [openSidebar,setOpenSideBar] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
        <SideBar open = {openSidebar} setOpen={setOpenSideBar}/>
       <div className='flex flex-1 flex-col'>
        <Header setOpen={setOpenSideBar}/>
             <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
             </main>
        </div>       
    </div>
  )
}

export default AdminLayout