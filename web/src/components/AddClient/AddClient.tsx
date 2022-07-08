import { useState } from 'react';

import {
  Box,
  Button,
  Input,
  MenuItem,
  Modal,
  Select,
  Typography,
  Card,
  Divider,
  FormControl,
  InputLabel,
} from '@mui/material';

import { useAuth } from '@redwoodjs/auth';
import { navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/dist/toast';

import SalesBulk from '../SalesBulk/SalesBulk';

const CREATE_CLIENT = gql`
  mutation createMyClient($input: CreateMyClientInput!) {
    createMyClient(input: $input) {
      id
      fullname
      owner
      status
    }
  }
`;

const CREATE_SALE = gql`
  mutation createSale($input: CreateSaleInput!) {
    createSale(input: $input) {
      id
      name
      clientOwnerId
      status
    }
  }
`;

const AddClient = ({ addedCallback }) => {
  const [open, setOpen] = useState(false);
  const [newSalesList, setNewSalesList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [create] = useMutation(CREATE_CLIENT);
  const [createSale] = useMutation(CREATE_SALE);

  const { currentUser } = useAuth();

  const onSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    const newClient = {
      fullname: data.get('fullname'),
      status: data.get('status'),
      email: data.get('email'),
      phone: data.get('phone'),
      owner: currentUser.uid,
    };

    const response = await create({ variables: { input: newClient } });

    if (response?.data?.createMyClient?.id) {
      event.target.reset();
      addedCallback(response.data.createMyClient);
      toast('Client added');

      try {
        const sales = newSalesList.map(item => {
          item['owner'] = currentUser.uid;
          item['clientOwnerId'] = response?.data?.createMyClient?.id;
          return item;
        });

        const recordsSales = sales.map(item => {
          return createSale({ variables: { input: item } });
        });

        await Promise.all(recordsSales);
      } catch (e) {
        console.log(e);
      }

      navigate(`/dashboard/client/${response.data.createMyClient.id}`);
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Button onClick={handleOpen}>New client</Button>
      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={handleClose}
      >
        <Box>
          <Card sx={{ padding: '1rem', minWidth: '400px' }}>
            <form
              onSubmit={e => onSubmit(e)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1rem',
              }}
            >
              <Typography variant='h4'>Create client</Typography>
              <FormControl fullWidth>
                <Input
                  placeholder='Full name'
                  name='fullname'
                  required
                  autoComplete='off'
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='create-client-status-label'>Status</InputLabel>
                <Select
                  id='create-client-status'
                  labelId='create-client-status-label'
                  defaultValue={'active'}
                  label='Status'
                  required
                  name='status'
                >
                  <MenuItem value={'active'}>Active</MenuItem>
                  <MenuItem value={'non-active'}>Non-active</MenuItem>
                  <MenuItem value={'lead'}>Lead</MenuItem>
                </Select>
              </FormControl>
              <Divider />
              <Typography variant='subtitle1'>Contact info</Typography>
              <FormControl fullWidth>
                <Input placeholder='email' name='email' autoComplete='off' />
              </FormControl>
              <FormControl fullWidth>
                <Input placeholder='phone' name='phone' autoComplete='off' />
              </FormControl>

              <Divider />
              <Typography variant='subtitle1'>Oportunities</Typography>
              <SalesBulk
                sales={newSalesList}
                onSalesUpdate={e => setNewSalesList([...newSalesList, e])}
              />
              <Button variant='contained' fullWidth type='submit'>
                Create
              </Button>
            </form>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default AddClient;
