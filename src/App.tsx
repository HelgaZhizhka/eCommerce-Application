import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './pages/Main';

const App: React.FC = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
