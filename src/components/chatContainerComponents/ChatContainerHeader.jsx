
import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
const ChatHeader = ({mobileOpen,isMobile,setMobileOpen,collapsed,HeaderWidth,handleToggleCollapse}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width:HeaderWidth,
        top: 0,
        padding: 2,
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        zIndex: 10,
      }}
    >
           {!collapsed&&isMobile && (
        <IconButton onClick={()=>setMobileOpen((prev)=>!prev)} >
          <MenuIcon />
        </IconButton>
      )}
       {/* <IconButton onClick={handleToggleCollapse} >
          <MenuIcon />
        </IconButton> */}
        {collapsed&&
            <MenuIcon onClick={()=>handleToggleCollapse()} />
        }
      <Typography sx={{
      fontSize:{
        xs:"14px",
        md:"16px"
      },
     marginLeft:"10px"
      }} variant="h6" fontWeight={600}>
        Pay slips Information
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <NotificationsNoneIcon />
        <LanguageIcon />
        <Avatar
          src="https://i.pravatar.cc/300"
          sx={{ width: 32, height: 32 }}
        />
      </Box>
    </Box>
  );
};

export default ChatHeader;
