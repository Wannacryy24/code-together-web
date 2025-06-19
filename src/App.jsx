import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts/MainLayouts'
import { Header2 } from './layouts/Header/Header2'
function App() {

  return (
    <BrowserRouter>
      <Header2 />
      <MainLayout />
    </BrowserRouter>
  )
}

export default App;