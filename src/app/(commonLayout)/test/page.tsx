import DashboardSkeleton from '@/components/shared/DashBoardSkeleton'
import ManagementPageLoader from '@/components/shared/ManagementPageLoader'
import TravelLoader from '@/components/shared/TravelLoader'
import { getAllAdmins } from '@/services/admin/adminManagement'
import { getAllTourists } from '@/services/admin/touristManagement'
import { getAllListings } from '@/services/listing/listingManagement'
import React from 'react'

const page = async() => {
    const adminsResult = await getAllListings();

    console.log(adminsResult);
    

  
  return (
    <div>
      {/* <DashboardSkeleton/> */}
      <div>Hello</div>
      {/* <ManagementPageLoader columns={4} hasActionButton filterCount={2} filterWidths={['w-40', 'w-40']} />

      <TravelLoader></TravelLoader> */}
    </div>
  )
}

export default page
