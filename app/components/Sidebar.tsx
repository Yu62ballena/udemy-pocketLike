import React from 'react'
import SidebarContents from './SidebarContents'

function Sidebar() {
  return (
    <section className='w-1/5'>
      <h3 className='font-bold text-3xl'>サイドバー</h3>
      <SidebarContents />
      <SidebarContents />
    </section>
  )
}

export default Sidebar