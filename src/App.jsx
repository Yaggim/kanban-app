import React, { useState } from 'react'
import Header from './Components/Header'
import Center from './Components/Center'
import './index.css';

function App() {

  const [boardModalOpen, setBoardModalOpen] = useState(false)

  return (
    <div>
      
      {/* Header Section */}

      <Header boardModalOpen= {boardModalOpen} setBoardModalOpen= {setBoardModalOpen}/>

      {/* Center Section */}

      <Center/>
    </div>
  )
}

export default App