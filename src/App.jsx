import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StringGenerator from './pages/StringGenerator'
import Translator from './pages/Translator'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/#/generator" element={<StringGenerator />} />
        <Route path="/#/translator" element={<Translator />} />
      </Routes>
    </HashRouter>
  )
}

export default App
