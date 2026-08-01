import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 overflow-y-auto overflow-x-hidden'>
        <div className='bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
          <Manager />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
