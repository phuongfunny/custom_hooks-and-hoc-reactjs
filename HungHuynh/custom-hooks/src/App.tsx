import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        {routes.map(({ path, component: Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
