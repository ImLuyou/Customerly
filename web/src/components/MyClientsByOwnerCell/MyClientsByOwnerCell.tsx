import { useState } from 'react';

import { Box, Button, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import _ from 'lodash';
import type {
  FindMyClientsByOwnerQuery,
  FindMyClientsByOwnerQueryVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import AddClient from '../AddClient/AddClient';

export const QUERY = gql`
  query FindMyClientsByOwnerQuery($owner: String!) {
    myClientsByOwner: myClientsByOwner(owner: $owner) {
      id
      fullname
      status
    }
  }
`;

export const beforeQuery = props => {
  return { variables: props, fetchPolicy: 'cache-and-network' };
};

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindMyClientsByOwnerQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({
  myClientsByOwner,
}: CellSuccessProps<
  FindMyClientsByOwnerQuery,
  FindMyClientsByOwnerQueryVariables
>) => {
  const [clients, setClients] = useState(myClientsByOwner);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'fullname', headerName: 'Full name', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ value }) => _.capitalize(value.replace('-', ' ')),
    },
  ];

  function handleNewClient(client) {
    setClients([...clients, client]);
  }
  return (
    <>
      <Grid
        container
        sx={{
          width: '100%',
        }}
        pl={2}
        pt={1}
      >
        <Grid item xs={12} pb={1} pl={1} pt={1}>
          <AddClient addedCallback={e => handleNewClient(e)} />
        </Grid>
        <Grid container pl={2} pr={2}>
          <Box sx={{ minHeight: '511px', height: '100%', minWidth: '100%' }}>
            <DataGrid
              components={{ Toolbar: GridToolbar }}
              rows={clients}
              columns={columns}
              columnBuffer={4}
              pageSize={10}
              rowsPerPageOptions={[10]}
              rowHeight={50}
              onCellClick={value => {
                if (value.field !== 'actions') {
                  navigate(routes.myClient({ id: value.row.id }));
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
