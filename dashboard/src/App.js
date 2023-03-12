import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScanResultForm from './ScanResultForm.tsx';
import SecondScreen from './SecondScreen.tsx';
import FindingTable from './ScanFindingsTable.tsx';

function App() {
  const routes = [
    { path: '/', element: <ScanResultForm /> }, // First Screen
    { path: '/scan-results', element: <SecondScreen /> }, // Second Screen
    { path: '/finding-results/*', element: <FindingTable /> }, // Third Screen
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
