import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/navbar'
import { Box } from '@mui/material'

function LoggedLayout(props) {
  return (
    <div>
    <Navbar/>
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      {props.children}
    </Box>
    </div>
  )
}

export default LoggedLayout