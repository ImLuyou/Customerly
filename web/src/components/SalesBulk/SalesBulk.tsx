import { useState } from 'react';

import { Close, Edit } from '@mui/icons-material';
import {
  TableContainer,
  Box,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Table,
  Grid,
  Card,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import _ from 'lodash';

import { useAuth } from '@redwoodjs/auth';
import { useMutation } from '@redwoodjs/web';

import UpdateSaleRow from '../UpdateSaleRow/UpdateSaleRow';

const DELETE_SALE = gql`
  mutation deleteSale($id: String!) {
    deleteSale(id: $id) {
      id
    }
  }
`;

const SAVE_ALONE_SALE = gql`
  mutation createSale($input: CreateSaleInput!) {
    createSale(input: $input) {
      id
    }
  }
`;

const SalesBulk = ({ sales, onSalesUpdate = data => {}, saveData = null }) => {
  const [newSales, setNewSales] = useState(sales);
  const [saleName, setSaleName] = useState('');
  const [status, setStatus] = useState('new');
  const [open, setOpen] = useState(false);
  const [createSale] = useMutation(SAVE_ALONE_SALE);

  const { currentUser } = useAuth();

  const [deleteSale] = useMutation(DELETE_SALE);

  const saveAloneSale = async row => {
    row['owner'] = currentUser.uid;
    row['clientOwnerId'] = saveData;
    return createSale({ variables: { input: row } });
  };

  const handleNew = async () => {
    const newSale = {
      name: saleName,
      status: status,
    };

    if (saveData !== null) {
      await saveAloneSale(newSale);
    }

    if (saleName != '') {
      setSaleName('');
      setNewSales([...newSales, newSale]);
      onSalesUpdate(newSale);
    }
  };

  const handleUpdateSaleRow = async newRow => {
    const newArray = newSales.map(sale => {
      if (sale.id === newRow.id) {
        return { ...sale, name: newRow.name, status: newRow.status };
      }

      return sale;
    });

    setNewSales([...newArray]);
  };

  const removeSale = async row => {
    if (row['id'] !== undefined) {
      if (currentUser.uid == row['owner']) {
        const deleted = await deleteSale({
          variables: { id: row.id },
        });

        if (deleted?.data?.deleteSale?.id) {
          setOpen(false);
          setNewSales(
            newSales.filter(item => item.id !== deleted?.data?.deleteSale?.id)
          );
        }
      }
    } else {
      setNewSales(newSales.filter(item => item.name !== row.name));
      setOpen(false);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Card sx={{ padding: '1rem' }}>
            <Box
              display='flex'
              sx={{
                alignItems: 'flex-end',
              }}
            >
              <FormControl sx={{ width: '50%' }}>
                <InputLabel htmlFor='sale-name'>Name</InputLabel>
                <Input
                  id='sale-name'
                  name='sale-name'
                  value={saleName}
                  autoComplete='off'
                  onChange={e => setSaleName(e.target.value)}
                />
              </FormControl>

              <FormControl sx={{ width: '50%' }}>
                <InputLabel id='status-label'>Status</InputLabel>
                <Select
                  label='status'
                  labelId='status-label'
                  defaultValue={'new'}
                  required
                  name='status'
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <MenuItem value={'new'}>New</MenuItem>
                  <MenuItem value={'closed-won'}>Closed won</MenuItem>
                  <MenuItem value={'closed-lost'}>Closed lost</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button onClick={() => handleNew()}>Register Oportuinity</Button>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minHeight: '100px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newSales.length === 0 && (
                  <TableCell>
                    <Typography variant='caption' p={1}>
                      No sales listed
                    </Typography>
                  </TableCell>
                )}
                {newSales.map(row => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{_.capitalize(row.name)}</TableCell>
                    <TableCell>
                      {_.capitalize(row.status.replace('-', ' '))}
                    </TableCell>
                    <TableCell align='center'>
                      {saveData && (
                        <UpdateSaleRow
                          currentSale={row}
                          updatedSale={e => handleUpdateSaleRow(e)}
                        />
                      )}
                      <Button onClick={() => setOpen(true)}>
                        <Close />
                      </Button>
                      <Dialog
                        open={open}
                        keepMounted
                        onClose={() => setOpen(false)}
                      >
                        <DialogTitle>{'Delete sale'}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-slide-description'>
                            Are you sure that you want to delete this record?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpen(false)}>
                            Keep record
                          </Button>
                          <Button onClick={() => removeSale(row)}>
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesBulk;
