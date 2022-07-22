import React from 'react';
import Sidebar from '../sidebar';


const Layout = ({children}) => {
  return (
    
        <div className='page-wrapper'>
            <Sidebar />
            <main className='main-content'>
                {children}
            </main>
        </div>
  )
}

export default Layout