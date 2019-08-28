import React,{Component}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Dialog from '../dialog'; 
import Login from '../login/login'
import { connect } from "react-redux";
import { changeStatus } from "../../modules/login";
import { withSnackbar} from 'notistack';
import {Redirect} from 'react-router-dom'
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component{
 static defaultProps = {
        name: 'Read Bear',
        menu: true,
  }
  state = {
    goHome : false,
    loginOpen :false,
    logoutOpen :false
  }
  dialogOpen = prop => {
    this.setState({ [prop]: true });
  };

  dialogClose = prop => {
    this.setState({ [prop]: false });
  };
  goBack = () =>{
    this.setState({goHome:true})
  }

  logout =()=>{
    localStorage.clear();
    this.props.changeStatus(false);
    this.props.enqueueSnackbar("logout success!", {variant:'success'});
  }
  render(){
    const { classes } = this.props;
    if(this.state.goHome===true){
      return(<Redirect to ="/"></Redirect>);
    }else{
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              {(()=>{
                if(this.props.menu===true){
                 return(<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
              </IconButton>)}})()
              }
              <IconButton onClick={this.goBack} className={classes.menuButton}><Icon >home</Icon></IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                {this.props.name}
              </Typography>
              {
                (()=>{
                    if(this.props.login===false)
                        return (<Button onClick={()=>this.dialogOpen('loginOpen')} color="inherit">Login</Button>)
                    else
                        return (<Button onClick={()=>this.dialogOpen('logoutOpen')} color="inherit">Logout</Button>)
                    
                })()
            }
            <Dialog maxWith="xs" close={()=>this.dialogClose('logoutOpen')} open={this.state.logoutOpen} title ="Logout" content={'로그아웃 하시겠습니까?'}  button={[{name:'CANCLE',func:()=>{this.dialogClose('logoutOpen')}},{name:'CONFIRM',func:()=>{this.dialogClose('logoutOpen');this.logout();}}]}></Dialog>
          <Dialog maxWith="xs" open={this.state.loginOpen} content={<Login loginCallback={()=>this.dialogClose('loginOpen')}></Login>} close={()=>this.dialogClose('loginOpen')}></Dialog>
            </Toolbar>
          </AppBar>
        </div>
      );
  }
}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = ({ login }) => ({
  login: login.login
});

// **** 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
const mapDispatchToProps = { changeStatus };

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonAppBar)));
