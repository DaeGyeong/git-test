import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import Dialog from '../dialog';
import { connect } from "react-redux";
import { changeStatus } from "../../modules/login";
import {withSnackbar} from 'notistack';
import SignUp from '../signUp/signUp'
const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
      },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
    button: {
        margin: theme.spacing.unit
      },
  root: {
    "max-width":"90%",
    margin:" 0 auto",
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    flexBasis: 200,
  },
  margin: {
    "min-width":"300px",
    margin: theme.spacing.unit
  },
  cssLabel: {
    "&$cssFocused": {
      color: purple[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: purple[500]
    }
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: purple[500]
    }
  },
  notchedOutline: {}
});

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id : '',
            password : '',
            open:false,
        alertOpen:false,
        alertContent:'',
        alertTitle:''
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
     }
     dialogOpen = (prop,content,title) => {
       if(content&&title){
        this.setState({ [prop]: true,alertContent:content,alertTitle:title});
       }
       else if(content){
        this.setState({ [prop]: true,alertContent:content});
       }else{
        this.setState({ [prop]: true});
       }
      
    };
  
    dialogClose = prop => {
      this.setState({ [prop]: false });
    };
      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };
    
     handleClickOpen = () => {
        this.setState({ open: true });
      };
  inputChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
      })
  }
  logout(){
    this.props.changeStatus(false);
    this.props.enqueueSnackbar("logout success!", {variant:'success'});
    localStorage.clear();
    this.setState({
        username:""
    })
  }
  login(){
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    var _this=this;
    fetch("/auth/login/", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
          },
        body: JSON.stringify({
            username : this.state.id,
            password : this.state.password
        })
    })
    .then(function(response){
        if(response.status===200){
            return response.json();
        }else if(response.status===400){
            return null;
        }
        
    }).then(function(data) {
        if(data!==null){
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('token', data.token);
            _this.setState({
                username:localStorage.getItem('username')
            })
            _this.props.changeStatus(true);
            _this.props.enqueueSnackbar("login success!", {variant:'success'});
            if(_this.props.loginCallback){
              _this.props.loginCallback();
            }
        }else{
          _this.dialogOpen('alertOpen',"아이디와 비밀번호를 확인하세요","Error")
        }
      });
  }

  render() {
        return (
            <article className="article">
            <header className="header">
            {
                (() => {
                    if (!this.props.login) return (<h3 className="h3">Login</h3>);
                    else return (<h3 className="h3" style={{"textAlign":"center","minHeight":"163px","paddingTop":"60px"}}>{localStorage.getItem("username")+"님 환영합니다."}</h3>);
                })()
            }
                
            </header>
            {
                (() => {
                    if (!this.props.login) return (<form className="form">
                    <div className="form-group">
                    <label className="label">ID</label>
                        <input onChange={this.inputChange} name="id" type="text" className="input form-control"  aria-describedby="emailHelp" placeholder="Enter id"></input>
                    </div>
                    <div className="form-group">
                        <label className="label">Password</label>
                        <input onChange={this.inputChange} name="password" type="password" className="input form-control" placeholder="Password"></input>
                    </div>
                    </form>
                    
                    );
                    
                })()
            }
                        
            {
                (() => {
                    if (!this.props.login) return (<footer className="footer"><button type="submit" onClick={this.login} style={{"marginRight":"10%",width:"45%"}} className="button btn btn-primary">로그인</button>   
                    <button onClick={this.handleClickOpen}  type="submit" className="button btn btn-secondary" style={{width:"45%"}}>회원가입</button> </footer>);
                    else return (<footer className="footer"><button type="submit" onClick={this.logout} style={{"marginRight":"10%",width:"45%"}} className="button btn btn-primary">로그아웃</button>   
                    <button onClick={this.handleClickOpen} type="submit" className="button btn btn-secondary" style={{width:"45%"}}>회원가입</button></footer>);
                })()
            }
            
           
          
    <Dialog fullWidth={false} maxWith="xs" close={()=>this.dialogClose('open')} open={this.state.open} title ="SignUp" content={<SignUp submitCallback={()=>this.dialogClose('open')}></SignUp>} ></Dialog>
    <Dialog maxWith="xs" close={()=>this.dialogClose('alertOpen')} open={this.state.alertOpen} title ={this.state.alertTitle} content={this.state.alertContent}  button={[{name:'OK',func:()=>{this.dialogClose('alertOpen')}}]}></Dialog>
            </article>
         
        );
    
    
}
}
  


  const mapStateToProps = ({ login }) => ({
    login: login.login
  });
  
  // **** 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
  const mapDispatchToProps = { changeStatus };
  
  export default withSnackbar(withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)));
  
