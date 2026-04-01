import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StringGenerator from './pages/StringGenerator'
import Translator from './pages/Translator'

function App() {
  return (
    <BrowserRouter basename="/qskill-internship">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<StringGenerator />} />
        <Route path="/translator" element={<Translator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
