import { Routes, Route } from 'react-router-dom'
import ControlsPage from './control/ControlsPage'
import DisplayPage from './display/DisplayPage'
import { useVNState } from './clientState'
import BehindModel from './display/BehindModel';
import InFrontOfModel from './display/InFrontOfModel';

function App() {
  const [vnState, updateVNState] = useVNState();
  return (
    <Routes>
      <Route path="/controls" element={<ControlsPage vnState={vnState} onUpdate={updateVNState}/>} />
      <Route path="/display" element={<DisplayPage vnState={vnState}/>} />
      <Route path="/behindmodel" element={<BehindModel vnState={vnState}/>} />
      <Route path="/infrontofmodel" element={<InFrontOfModel vnState={vnState}/>} />
      <Route path="/" element={<ControlsPage vnState={vnState} onUpdate={updateVNState}/>} />
    </Routes>
  )
}

export default App
