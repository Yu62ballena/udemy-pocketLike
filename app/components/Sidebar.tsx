import React from 'react'
import SidebarContents from './SidebarContents'
import { filterItems } from '@/constants/filterItems'

function Sidebar() {
  return (
    <section className='w-1/5'>
      <SidebarContents title="フィルター" contents={filterItems} />
      {/* <SidebarContents /> */}
    </section>
  )
}

export default Sidebar