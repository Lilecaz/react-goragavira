import './styles/App.css';
import Wrapper from "./Components/Wrapper";
import Navbar from './Components/Navbar';
import MyRoutes from './Components/MyRoutes';
import { CartProvider } from './Components/CardContext';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <Wrapper>
        <CartProvider>
          <header className="App-header">
            <Navbar />
          </header>
          <MyRoutes />
        </CartProvider>
      </Wrapper>
    </div>
  );
}

export default App;
