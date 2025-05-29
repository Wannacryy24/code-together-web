import {BrowserRouter} from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts/MainLayouts'
import { Header } from './layouts/Header'
import CompaniesSection from './pages/CompaniesSection'
import Footer from './pages/Footer/Footer'
import UserNameModal from './layouts/ModalComponent/UserNameModal'

function App() {

  return (
      <BrowserRouter>
        <Header/>
        <UserNameModal/>
        <MainLayout/>

        {/* <CompaniesSection/> */}
        
      </BrowserRouter>
  )
}

export default App
