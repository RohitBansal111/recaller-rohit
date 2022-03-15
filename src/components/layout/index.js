import React from 'react';
import Sidebar from '../sidebar';


const Layout = ({children}) => {
  return (
        <div className='page-wrapper'>
            <div className='page-sidebar'>
                <Sidebar />
            </div>
            <main className='main-content'>
                {children}
            </main>
        </div>
  )
}

export default Layout