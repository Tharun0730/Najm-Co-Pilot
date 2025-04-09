import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import TryOutlinedIcon from '@mui/icons-material/TryOutlined';
import company_log from './../../assets/company_logo.png';
import CompanySwitcher from '../sideBarComponents/CompanySwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatHistory } from '../../store/features/chatHistorySlice';
import ChatHistoryList from '../sideBarComponents/ChatHistoryList';

const Sidebar = ({collapsed, setCollapsed,mobileOpen, setMobileOpen}) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:768px)');

//   const [collapsed, setCollapsed] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const { messageHistoryLoader, messageHistory } = useSelector(
    (state) => state.chatHistorySlice
  );

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileOpen(true);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const handleMobileClose = () => setMobileOpen(false);
  const handleSearchToggle = () => setShowSearch((prev) => !prev);

  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: collapsed && !isMobile ? 0 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: collapsed && !isMobile ? 'none' : 'auto',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={company_log} alt="logo" width={30} />
          {!collapsed && (
            <>
              <Typography variant="h6" fontWeight={600}>
                Sahab
              </Typography>
              <Typography variant="h6" sx={{ color: '#666666' }} fontWeight={600}>
                Payroll
              </Typography>
            </>
          )}
        </Box>

        <Box>
          {isMobile ? (
            <IconButton onClick={handleMobileClose}>
              <CloseIcon />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={handleSearchToggle}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      {showSearch && (
        <TextField size="small" placeholder="Search..." fullWidth sx={{ mb: 2 }} />
      )}

      <CompanySwitcher />

      <Box sx={{ display: 'flex', justifyContent: 'start' }}>
        <Typography variant="body2" fontWeight={600}>
          New Chat
        </Typography>
      </Box>

      <ChatHistoryList
        messageHistory={messageHistory}
        messageHistoryLoader={messageHistoryLoader}
      />

      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Typography variant="body2" fontWeight={600}>
            Explore
          </Typography>
        </Box>

        <List>
          <ListItem button>
            <ListItemIcon>
              <PermIdentityOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="My Info" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="My Approval" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* {isMobile && (
        <IconButton onClick={handleMenuClick} sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}>
          <MenuIcon />
        </IconButton>
      )} */}

<Drawer
  variant={isMobile ? 'temporary' : 'permanent'}
  anchor="left"
  open={isMobile ? mobileOpen : !collapsed} // 👈 Important to prevent rendering
  onClose={handleMobileClose}
  ModalProps={{ keepMounted: true }}
  sx={{
    display: isMobile ? 'block' : collapsed ? 'none' : 'block', // 👈 Hide it when collapsed
    width: isMobile ? '100%' : collapsed ? '0px' : '22%',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: 'width 0.3s ease',

    '& .MuiDrawer-paper': {
      width: isMobile ? '100%' : collapsed ? '0px' : '22%',
      transition: 'width 0.3s ease, padding 0.3s ease',
      padding: collapsed && !isMobile ? '8px' : '16px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    },
  }}
>

        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
