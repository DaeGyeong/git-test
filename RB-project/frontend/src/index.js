import React from 'react';
import ReactDOM from 'react-dom';
import Main from './component/compose/compose_main';
import { SnackbarProvider} from 'notistack';
import Footer from './component/footer/footer';
import Blog from './component/compose/blog';
import Detail from './component/compose/detail';
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import { createStore } from "redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import rootReducer from "./modules";
import { Provider } from "react-redux";
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);
const theme = createMuiTheme({ typography: { useNextVariants: true } });

ReactDOM.render(
  <Provider store={store}>
  <SnackbarProvider autoHideDuration={1000} maxSnack={3}>
  <ThemeProvider theme={theme}>
    <Router>
       <Switch>
        <Route exact path="/" component={Main} />

        
        
        <Route exact path="/blog/detail" component={Detail} />     
        <Route exact path="/blog" component={Blog} />      
        <Route component={Main}/>
        
        
        </Switch>
    </Router>
    </ThemeProvider>
    <Footer />
    </SnackbarProvider>
  </Provider>
, document.getElementById('root'));


