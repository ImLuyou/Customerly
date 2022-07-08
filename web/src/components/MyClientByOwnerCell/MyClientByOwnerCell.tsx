import { useState } from 'react';

import { Email, Phone } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import type {
  FindMyClientByOwnerQuery2,
  FindMyClientByOwnerQuery2Variables,
} from 'types/graphql';

import { back } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import SalesBulk from '../SalesBulk/SalesBulk';
import UpdateMyClient from '../UpdateMyClient/UpdateMyClient';

export const QUERY = gql`
  query FindMyClientByOwnerQuery2($id: String!, $owner: String!) {
    myClientByOwner: myClientByOwner(id: $id, owner: $owner) {
      id
      fullname
      status
      email
      phone
      sales {
        id
        name
        owner
        status
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindMyClientByOwnerQuery2Variables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({
  myClientByOwner,
}: CellSuccessProps<
  FindMyClientByOwnerQuery2,
  FindMyClientByOwnerQuery2Variables
>) => {
  const [displayClient, setDisplayClient] = useState(myClientByOwner);

  return (
    <Grid container>
      <FormControl sx={{ width: '100%' }}>
        <Grid
          item
          xs={12}
          display='flex'
          style={{ justifyContent: 'space-between' }}
        >
          <Button onClick={e => back()}>Back</Button>
          <UpdateMyClient
            updatedClient={e => {
              setDisplayClient(e);
            }}
            currentClient={displayClient}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Card sx={{ padding: '1rem', width: '100%' }}>
              <Grid item xs={12} md={6}>
                <Typography variant='h4'>{displayClient.fullname}</Typography>
                <Typography variant='subtitle1'>
                  {_.capitalize(displayClient.status.replace('-', ' '))}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        displayClient?.email ? displayClient?.email : 'No email'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Phone />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        displayClient?.phone ? displayClient?.phone : 'No phone'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant='h5' p={2}>
              Oportuinity records
            </Typography>
            <SalesBulk
              sales={displayClient.sales}
              saveData={displayClient.id}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
};
