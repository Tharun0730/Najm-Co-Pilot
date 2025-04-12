import React from 'react';
import {
  Box,
  Typography,
  List,
  Skeleton,
  Divider,
  ListItem,
} from '@mui/material';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

const ChatHistoryList = ({ messageHistory, messageHistoryLoader }) => {
  console.log(messageHistory.length,"messageHistory.length")
  return (
    <Box sx={{ p: 0.4, flexGrow: 1, overflowY: 'auto', maxHeight: '55vh' }}>
      <List>
        {messageHistoryLoader ? (
          Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <Skeleton variant="text" height={20} width="80%" sx={{ mt: 2, ml: 2 }} />
              <Skeleton variant="text" height={15} width="60%" sx={{ ml: 2, mb: 1 }} />
              <Divider sx={{ my: 2 }} />
            </React.Fragment>
          ))
        ) : messageHistory && messageHistory.length >= 2 ? (
          messageHistory.map((data, key) =>{
            if(data.type !== 'user') return null
          return(
            <React.Fragment key={key}>
            <ListItem
              button
              sx={{
                px: 0,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)', // light gray
                },
              }}
            >
              <SortOutlinedIcon sx={{ marginRight: "5px", color: "text.secondary" }} />
              <Typography
                textAlign="start"
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ width: '100%' }}
              >
            
                {data.type === 'user' && (
                  <strong>{data.content}</strong>
                ) }
              </Typography>
            </ListItem>
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
          )
          })
        ) : (
          <Typography
            textAlign="center"
            variant="body2"
            color="text.secondary"
            mt={2}
          >
            No Chat History
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ChatHistoryList;
