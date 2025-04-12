import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Skeleton,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector, useDispatch } from 'react-redux';
import ChatHeader from './ChatContainerHeader';
import {
  addUserMessage,
  fetchBotResponse,
  clearMessages,
  loadMessages,
} from '../../store/features/chatSlice';

const ChatContainer = ({
  isMobile,
  mobileOpen,
  setMobileOpen,
  collapsed,
  HeaderWidth,
  handleToggleCollapse,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messages = useSelector((state) => state.chatSlice.messages);
  const status = useSelector((state) => state.chatSlice.status);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const predefinedPrompts = [
    'Who is Dhoni?',
    'Tell me a fun fact',
    'What’s the capital of India?',
    'Give me a joke',
    'How does AI work?',
  ];

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    if (savedMessages.length > 0) {
      dispatch(loadMessages(savedMessages));
    }
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    dispatch(addUserMessage(inputValue));
    dispatch(fetchBotResponse(inputValue));
    setInputValue('');
  };

  const handleClearChat = () => {
    dispatch(clearMessages());
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        backgroundColor: '#fafafa',
        mx: 'auto',
      }}
    >
      {HeaderWidth && (
        <ChatHeader
          mobileOpen={mobileOpen}
          isMobile={isMobile}
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          handleToggleCollapse={handleToggleCollapse}
          HeaderWidth={HeaderWidth}
        />
      )}

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 3,
          pt: 10,
          px: { xs: 5, sm: 8 },
        }}
      >
        <Typography variant="body2" color="text.secondary" mb={1}>
          Today
        </Typography>

        {messages.map((msg, idx) => (
          <Box key={idx} mb={2} textAlign={msg.type === 'user' ? 'right' : 'left'}>
            <Box
              sx={{
                position: 'relative',
                maxWidth: msg.type === 'user' ? '75%' : '100%',
                marginLeft: msg.type === 'user' ? 'auto' : '0',
                backgroundColor: msg.type === 'user' ? '#e6f0ff' : '#fff',
                borderRadius: 2,
              px:3.2,
              py:2,
                boxShadow: msg.type === 'user' ? 'none' : 1,
              }}
            >
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\n/g, '<br/>'),
                }}
              />
              {msg.type === 'bot' && (
                <Tooltip title="Copy">
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(msg.content)}
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      color: '#aaa',
                      '&:hover': { color: '#000' },
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {msg.type === 'bot' && (
              <Typography
                variant="caption"
                color="text.secondary"
                mt={0.5}
                display="block"
              >
                Najm Co-Pilot
              </Typography>
            )}
          </Box>
        ))}

        {status === 'loading' && (
          <Box mb={2} textAlign="left">
            <Box
              sx={{
                maxWidth: '100%',
                backgroundColor: '#fff',
                borderRadius: 2,
                padding: 2,
                boxShadow: 1,
              }}
            >
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="90%" />
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              mt={0.5}
              display="block"
            >
              Najm Co-Pilot
            </Typography>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      <Box
  sx={{
    display: 'flex',
    overflowX: { xs: 'auto', sm: 'visible' },
    flexWrap: { xs: 'nowrap', sm: 'wrap' },
    gap: 1,
    px: { xs: 2, sm: 5 },
    mb: 2,
    pb: 1,
    '&::-webkit-scrollbar': { display: 'none' },
  }}
>
  {predefinedPrompts.map((prompt, index) => (
    <Paper
      key={index}
      elevation={1}
      sx={{
        whiteSpace: 'nowrap',
        paddingX: 2,
        paddingY: 1,
        backgroundColor: 'transpalert',
        cursor: 'pointer',
        borderRadius: 5,
        flexShrink: 0,
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
      onClick={() => {
        dispatch(addUserMessage(prompt));
        dispatch(fetchBotResponse(prompt));
      }}
    >
      <Typography variant="body2">{prompt}</Typography>
    </Paper>
  ))}
</Box>


      <Paper
        elevation={3}
        sx={{
          padding: 1.5,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fff',
          borderRadius: 3,
          mx: { xs: 2, sm: 5 },
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask something..."
          variant="outlined"
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSend}
                  sx={{
                    backgroundColor: '#4f8df9',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: '#3c78dc',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              backgroundColor: '#fff',
              borderRadius: '12px',
              paddingRight: 1,
              paddingY: 1,
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Paper>

      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3 }}>
        <IconButton onClick={handleClearChat} sx={{ color: '#888' }}>
          <Typography variant="body2">Clear Chat</Typography>
        </IconButton>
      </Box> */}
    </Box>
  );
};

export default ChatContainer;
