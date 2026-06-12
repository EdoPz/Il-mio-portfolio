import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConceptBadge from './components/ConceptBadge';

function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        {/* La key cambia ad ogni rotta: rimonta il wrapper e rigioca la transizione */}
        <div className="page-transition" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <ConceptBadge />
      <ScrollRestoration />
    </div>
  );
}

export default App;
