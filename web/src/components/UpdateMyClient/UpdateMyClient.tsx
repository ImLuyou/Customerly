import { useState } from 'react';

import { Edit } from '@mui/icons-material';
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
import { useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/dist/toast';

const UPDATE_CLIENT = gql`
  mutation updateMyClient($id: String!, $input: UpdateMyClientInput!) {
    updateMyClient(id: $id, input: $input) {
      id
    }
  }
`;

const AddClient = ({ updatedClient, currentClient }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [update] = useMutation(UPDATE_CLIENT);

  const { currentUser } = useAuth();

  const onSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    const newClient = {
      fullname: data.get('fullname'),
      status: data.get('status'),
      email: data.get('email'),
      phone: data.get('phone'),
    };
    const response = await update({
      variables: {
        id: currentClient.id,
        owner: currentUser.uid,
        input: newClient,
      },
    });

    if (response?.data?.updateMyClient?.id) {
      event.target.reset();
      newClient['id'] = response?.data?.updateMyClient?.id;
      updatedClient(newClient);
      setOpen(false);
      toast('Client updated');
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Button onClick={handleOpen}>
        {' '}
        <Edit />{' '}
      </Button>
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
              <Typography variant='h4'>Update client</Typography>
              <FormControl fullWidth>
                <Input
                  placeholder='Full name'
                  name='fullname'
                  required
                  autoComplete='off'
                  defaultValue={currentClient.fullname}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='status-label'>Status</InputLabel>
                <Select
                  label='status'
                  labelId='status-label'
                  defaultValue={currentClient.status}
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
                <Input
                  defaultValue={currentClient.email}
                  placeholder='email'
                  name='email'
                  autoComplete='off'
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  defaultValue={currentClient.phone}
                  placeholder='phone'
                  name='phone'
                  autoComplete='off'
                />
              </FormControl>

              <Button variant='contained' fullWidth type='submit'>
                Update
              </Button>
            </form>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default AddClient;
