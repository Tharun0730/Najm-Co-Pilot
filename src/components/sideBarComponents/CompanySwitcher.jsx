import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Menu,
  Divider,
  Avatar,
  Skeleton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import companyListLogo from '../../assets/companyListLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, setSelectedCompany } from '../../store/features/companySlice';

const CompanySwitcher = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const {
    companyList,
    selectedCompany,
    companyLoader,
  } = useSelector((state) => state.companySlice);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelectCompany = (company) => {
    dispatch(setSelectedCompany(company));
    handleClose();
  };

  const defaultCompany = {
    company: 'Comm - IT India Pvt Ltd Long Name Company Private Limitxed',
    companyImage: companyListLogo,
  };

  const displayCompany = selectedCompany || defaultCompany;

  return (
    <Box
      sx={{
        border: '2px solid #e0e0e0',
        borderRadius: 2,
        p: 0.5,
        mb: 2,
        backgroundColor: '#fff',
      }}
    >
      {/* Top Selector */}
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          p: 1,
          borderRadius: 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ maxWidth: '80%' }}
        >
          
               <img
           src={displayCompany.companyImage}
            alt="Company Logo"
            width={28}
            height={28}
            style={{ flexShrink: 0 }}
          />
          <Typography
            fontSize={14}
            fontWeight={500}
            title={displayCompany.company}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {displayCompany.company}
          </Typography>
        </Box>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>

      {/* Dropdown Menu */}
      <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  PaperProps={{
    style: {
      maxHeight: 300,
      width: '250px',
      overflowY: 'auto',
    },
  }}
>
  {companyLoader ? (
    <List dense sx={{ px: 1 }}>
      {[...Array(4)].map((_, index) => (
        <ListItem key={index} disableGutters>
          <ListItemAvatar>
            <Skeleton variant="circular" width={24} height={24} />
          </ListItemAvatar>
          <ListItemText primary={<Skeleton width="80%" />} />
        </ListItem>
      ))}
    </List>
  ) : (
    companyList.map((comp) => (
      <MenuItem key={comp.id} onClick={() => handleSelectCompany(comp)}>
        <Avatar
          src={comp.companyImage}
          alt={comp.company}
          sx={{ width: 24, height: 24, mr: 1 }}
          imgProps={{ loading: 'lazy' }}
        />
        <Typography
          variant="body2"
          noWrap
          title={comp.company}
          sx={{ maxWidth: 180 }}
        >
          {comp.company}
        </Typography>
      </MenuItem>
    ))
  )}
</Menu>


      <Divider sx={{ my: 1 }} />

      {/* Bottom Switcher */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        p={1.2}
        sx={{ cursor: 'pointer' }}
      >
        <SwapHorizIcon fontSize="small" color="action" />
        <Typography fontSize={14} fontWeight={500} color="text.secondary">
          Switch to Portal
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanySwitcher;
