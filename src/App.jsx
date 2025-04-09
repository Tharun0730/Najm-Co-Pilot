import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/layout/SideBAr'
import ChatContainer from './components/chatContainerComponents/ChatContainer'
import MainLayout from './pages/mainLayout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<MainLayout/>

    </>
  )
}

export default App
