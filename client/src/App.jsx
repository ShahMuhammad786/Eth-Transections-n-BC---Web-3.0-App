import { Navebar, Welcome, Footer, Transections, Services } from './components'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navebar/>
        <Welcome/>
      </div>
      <Services/>
      <Transections/>
      <Footer/>
    </div>
  )
}

export default App
