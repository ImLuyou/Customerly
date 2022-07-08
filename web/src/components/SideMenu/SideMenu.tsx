import {
  AccessTime,
  ExitToApp,
  SupervisedUserCircle,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';

const SideMenu = ({ drawerOpen, onClose, onLinkClick }) => {
  const { logOut } = useAuth();

  // 24 hours clock function in one line
  const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const time = `${hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds}`;
    return time;
  };

  return (
    <Drawer anchor={'left'} onClose={onClose} open={drawerOpen}>
      <Box
        sx={{
          minWidth: '250px',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessTime />
              </ListItemIcon>
              <ListItemText primary={getTime()} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(routes.myClients());
                onLinkClick('Clients');
              }}
            >
              <ListItemIcon>
                <SupervisedUserCircle />
              </ListItemIcon>
              <ListItemText primary={'Client'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => logOut()}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
