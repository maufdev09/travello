import ManagementPageLoader from '@/components/shared/ManagementPageLoader'
import React from 'react'

const AdminManagementloading = () => {
  return (
    <div>
      <ManagementPageLoader columns={4} hasActionButton filterCount={2} filterWidths={['w-40', 'w-40']} />
    </div>
  )
}

export default AdminManagementloading
