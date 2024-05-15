import './App.css';
import { Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Protected from './Protected';
import Products from './Pagination/Products';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQuery from './ReactQuery/ReactQuery';

function App() {
const queryClient= new QueryClient()
  
  return (
    <>
    <Products/>
    {/* <QueryClientProvider client={queryClient}>
      <ReactQuery/>
    </QueryClientProvider> */}

    {/* Uncommenting this will  */}
  {/* <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div> */}
    </>
  );
}

export default App;
