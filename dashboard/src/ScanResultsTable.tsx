import React from 'react';
import { Table, Label,Icon } from 'semantic-ui-react';
import { useTable, Column } from 'react-table';

interface Finding {
    type: string;
    severity: string;
    description: string;
  }
  

  interface ScanResult {
    id: string;
    status: string;
    repositoryName: string;
    findings: Finding[];
    queuedAt: string;
    scanningAt: string;
    finishedAt: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
interface Props {
  scanResults: ScanResult[];
  onRowClick: (id: string) => void;
}

const ScanResultsTable: React.FC<Props> = ({ scanResults, onRowClick }) => {
    const columns: Column<ScanResult>[] = React.useMemo(
        () => [
          {
            Header: 'Repository Name',
            accessor: 'repositoryName',
          },
          {
            Header: 'Scan Status',
            accessor: 'status',
          },
          {
            Header: 'Findings',
            
            accessor: (d) => d.findings.length,
            Cell: ({ cell: { value } }) => (
              <div>
                <Icon name='warning sign' />
                <Label color={value > 0 ? 'red' : 'green'}>{value}</Label>
              </div>
            ),
          },
          {
            Header: 'Timestamp',
            accessor: (d) => {
              switch (d.status) {
                case 'Queued':
                  return d.queuedAt;
                case 'Scanning':
                  return d.scanningAt;
                case 'Success':
                  return d.finishedAt;
                default:
                  return d.updatedAt ?? '';
              }
            },
            Cell: ({ cell: { value } }) => {
              const timestamp = new Date(value);
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Asia/Kolkata',
});
const formattedDate = formatter.format(timestamp);
             return  <span>{formattedDate}</span>

          },
          },
          
        ],
        []
      );
      
  const data = React.useMemo(
    () =>
      scanResults.map((scanResult) => ({
        ...scanResult,
        id: scanResult.id // assuming that the id of each scan result is stored in the _id property
      })),
    [scanResults]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <Table.Header>
        {headerGroups.map((headerGroup) => (
          <Table.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Table.HeaderCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Table.Row {...row.getRowProps()} onClick={() => onRowClick(row.original._id)}>
              {row.cells.map((cell) => (
                <Table.Cell {...cell.getCellProps()}>{cell.render('Cell')}</Table.Cell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ScanResultsTable;
