import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataTable from './components/DataTable'
import { Container } from '@mui/material'

function App() {

  return (
    <Container sx={{mt:6}} maxWidth={false}>
    <DataTable/>
    </Container>
  )
}

export default App
