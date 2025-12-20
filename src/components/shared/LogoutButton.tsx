"use client"

import { logoutUser } from '@/services/auth/logoutUser'
import React from 'react'
import { Button } from '../ui/button'

function LogoutButton() {
    const handleLogout=async()=>{
        await logoutUser()
    }
  return <Button onClick={handleLogout}> Logout</Button>
}

export default LogoutButton
