import { Outlet } from "react-router"
import Footer from "./components/ui/layout/Footer"
import NavBar from "./components/ui/layout/Navbar"
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
      {/* NavBar */}
      <NavBar></NavBar>
      
      {/* Outlet */}
      <Outlet></Outlet>
      <ToastContainer></ToastContainer>

      {/* Footer */}
      <Footer></Footer>
    </>
  )
}

export default App
