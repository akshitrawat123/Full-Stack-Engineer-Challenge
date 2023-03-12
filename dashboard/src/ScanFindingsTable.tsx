import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

type Finding = {
  RuleId: string;
  Description: string;
  Severity: string;
  PathName: string;
  LineNumber: string;
};

type Props = {
  selectedScanResult: {
    repositoryName: string;
    scanStatus: string;
    findings: Finding[];
    timestamp: string;
  } | null;
};

const FindingTable: React.FC<Props> = () => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedScanResult = searchParams.get('selectedScanResult');

  if (!selectedScanResult) {
    return <div>Please select a scan result from the list.</div>;
  }
  const { repositoryName, findings } = JSON.parse(selectedScanResult);

  const styles = {
    'fontFamily': 'Arial, sans-serif',
    'fontSize': '16px',
    'backgroundColor': '#fff',
  'border': '1px solid #ccc'
  };
    

  return (
    <>
      {selectedScanResult ? (
        <>
        <div  className="my-4">
      <h2 className="text-center mb-4">Repository Name: {repositoryName}</h2>
          <table style={styles}  className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>RuleId</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Path name</th>
                <th>Line number</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((finding) => (
                <tr key={finding.ruleId} style={styles}>
                  <td>{finding.ruleId}</td>
                  <td>{finding.metadata.description}</td>
                  <td>{finding.metadata.severity}</td>
                  <td>{finding.location.path}</td>
                  <td>{finding.location.positions.begin.line}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      ) : (
        <div>Please select a scan result from the list.</div>
      )}
    </>
  );
};

export default FindingTable;
