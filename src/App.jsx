import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WorkFlow from './assets/WorkFlow'
import ProjectStructureTree from './MenuTree'

function App() {
  const [count, setCount] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  
  // Handle mouse down event to start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }
  
  // Handle mouse move event while dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    })
  }
  
  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, startPos])

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  }

  const draggableStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    cursor: 'move',
    width:"100%",
    // height:"100vh"
  }

  return (
    <div style={containerStyle}>
      <div
        style={draggableStyle}
        onMouseDown={handleMouseDown}
      >
        <ProjectStructureTree data={WorkFlow} />
      </div>
    </div>
  )
}

export default App