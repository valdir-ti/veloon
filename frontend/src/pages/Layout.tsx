import Header from '../components/Header'
import Footer from '../components/Footer'
import ProtectedRoutes from '../utils/ProtectedRoutes'

function Layout() {
  return (
    <div className='flex flex-1 flex-col h-screen'>
      <Header />
      <ProtectedRoutes />
      <Footer />
    </div>
  )
}

export default Layout
