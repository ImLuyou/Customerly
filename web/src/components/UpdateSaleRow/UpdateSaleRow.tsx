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
  FormControl,
  InputLabel,
} from '@mui/material';

import { useAuth } from '@redwoodjs/auth';
import { useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/dist/toast';

const UPDATE_SALE = gql`
  mutation updateSaleMutation($id: String!, $input: UpdateSaleInput!) {
    updateSale(id: $id, input: $input) {
      id
    }
  }
`;

const UpdateSaleRow = ({ currentSale, updatedSale }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [update] = useMutation(UPDATE_SALE);

  const { currentUser } = useAuth();

  const onSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    const newSale = {
      name: data.get('project-name'),
      status: data.get('status'),
    };
    const response = await update({
      variables: {
        id: currentSale.id,
        input: newSale,
      },
    });

    if (response?.data?.updateSale?.id) {
      event.target.reset();
      newSale['id'] = response?.data?.updateSale?.id;
      updatedSale(newSale);
      setOpen(false);
      toast('Sale updated');
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
              <Typography variant='h4'>Update sale</Typography>
              <FormControl fullWidth>
                <Input
                  placeholder='Project name'
                  name='project-name'
                  required
                  autoComplete='off'
                  defaultValue={currentSale.name}
                />
              </FormControl>
              <FormControl>
                <InputLabel id='status-label'>Status</InputLabel>
                <Select
                  label='status'
                  labelId='status-label'
                  defaultValue={currentSale.status}
                  required
                  name='status'
                >
                  <MenuItem value={'new'}>New</MenuItem>
                  <MenuItem value={'closed-won'}>Closed won</MenuItem>
                  <MenuItem value={'closed-lost'}>Closed lost</MenuItem>
                </Select>
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

export default UpdateSaleRow;
