import React, { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Sidebar from '../components/layout/SideBAr';
import ChatContainer from '../components/chatContainerComponents/ChatContainer';


const AppLayout = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
  const handleToggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}   collapsed={collapsed} setCollapsed={setCollapsed} />
  
    <ChatContainer isMobile={isMobile} mobileOpen={mobileOpen}  setMobileOpen={setMobileOpen}  collapsed={collapsed} handleToggleCollapse={handleToggleCollapse} HeaderWidth={isMobile ? '100%' : collapsed ? '100%' : '78%'}/>
  </Box>
  
  );
};

export default AppLayout;
