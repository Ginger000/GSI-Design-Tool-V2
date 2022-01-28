import React from 'react';
import { createTheme } from '@mui/material';

const CustomTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

export default CustomTheme;
