import React, { useState } from 'react';
import ScanResultsTable from './ScanResultsTable.tsx';
import FindingTable from './ScanFindingsTable.tsx';
import { useNavigate } from 'react-router-dom';
import { options } from 'joi';

interface ScanResult {
  id: string;
  repositoryName: string;
  status: string;
  findings: number;
  timestamp: string;
}

const SecondScreen: React.FC = () => {
  const [scanResults, setScanResults] = React.useState<ScanResult[]>([]);
  const [selectedScanResult, setSelectedScanResult] = useState<Response | null>(null);
  let navigate = useNavigate();

  const handleRowClick = async (id: string) => {
    // Find the scan result in the list of scan results based on the id
    const result = await fetch('http://localhost:3000/results/'+id)
    .then(response => response.json());

    // Set the selected scan result
    setSelectedScanResult(result);

    // Navigate to the finding results page with the selected scan result as a query parameter
    navigate({
        pathname: "/finding-results",
        search: `?selectedScanResult=${JSON.stringify(result)}`,
      });
  };

  React.useEffect(() => {
    // fetch scan results from server
    const fetchScanResults = async () => {
      const response = await fetch('http://localhost:3000/results');
      const data = await response.json();
      setScanResults(data);
      console.log(data);
    };
    fetchScanResults();
  }, []);

  return (
    <div>
      <ScanResultsTable scanResults={scanResults} onRowClick={handleRowClick} />
    </div>
  );
};

export default SecondScreen;
