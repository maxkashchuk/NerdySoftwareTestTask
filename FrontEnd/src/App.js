import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path='/'/>
      </Routes>
    </div>
  );
}

export default App
