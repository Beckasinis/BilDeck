import { Routes, Route } from 'react-router'
import './app.css'
import { Header, Footer } from './components'
import HomeView from './views/home'
import DeckView from './views/deck'
import SignUpView from './views/signup'
import NotFoundView from './views/NotFound'

function App() {
  return (
    <div id="root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/deck" element={<DeckView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App