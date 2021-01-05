import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import { Routes } from './routes/Routes';
import store from './store/store';
import { persistor } from "./store/store";
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
