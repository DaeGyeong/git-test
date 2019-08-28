import React,{ Component }  from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import Grid from '@material-ui/core/Grid';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from "../dialog"
const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
      },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
    button: {
        margin: theme.spacing.unit,
        float: "right"
      },
  root: {
    margin:" 0 auto",
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    flexBasis: 200,
  },
  margin: {
    width: '95%',
    minWidth: '200px',
    maxWidth:"300px",
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

class SignUp extends Component{
      state = {
        signUp:false,
        ID : '',
        confirmPassword : '',
        password: '',
        showConfirmPassword: false,
        showPassword: false,
        alertContent:'',
        alertTitle:'',
        alertOpen:false
      };
      dialogOpen = (prop,content,title,status) => {
        if(content&&title&&status){
          this.setState({ [prop]: true,alertContent:content,alertTitle:title,signUp:status});
         }
        else if(content&&title){
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
    
      handleClickShowPassword = prop => {
        this.setState(state => ({ [prop]: !state[prop] }));
      };

      signUp = () =>{
        var _this=this;
        //[영문 대문자 또는 소문자로 시작하는 아이디, 길이는 5~15자, 끝날때 제한 없음]
        var idReg = /^[A-Za-z0-9]{5,15}/g;
        //조건1. 6~20 영문 대소문자
        //조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
        var pwReg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/
        if(this.state.ID===''){
            this.dialogOpen('alertOpen',"아이디를 입력해주세요","Error")
            return false;
        }

        if(!idReg.test(this.state.ID)){
          this.dialogOpen('alertOpen',"아이디는 영문자,숫자 포함 5~15 글자로 작성해주세요","Error")
            return false;
        }

        if(this.state.password===''){
          this.dialogOpen('alertOpen',"비밀번호를 입력해주세요","Error")
            return false;
        }

        if(this.state.confirmPassword===''){
          this.dialogOpen('alertOpen',"비밀번호 확인을 입력해주세요","Error")
            return false;
        }
        
        if(!pwReg.test(this.state.password)){
          this.dialogOpen('alertOpen',"비밀번호는 영문자와 최소 1개의 숫자또는 특수문자를 포함해 6~20 글자로 작성해주세요","Error")
            return false;
        }
 
        if(this.state.confirmPassword!==this.state.password){
          this.dialogOpen('alertOpen',"비밀번호와 비밀번호 확인이 일치하지 않습니다","Error")
            return false;
        }
        
        fetch("/auth/account/", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
              },
            body: JSON.stringify({
                username : this.state.ID,
                password1 : this.state.password,
                password2 : this.state.password
            })
        })
        .then(function(response){
            console.log(response)
            if(response.status===200){
                return response.json();
            }else if(response.status===400){
                return null;
            }
            
        }).then(function(data) {
            if(data!==null){
              _this.dialogOpen('alertOpen',"회원가입이 완료됬습니다! 로그인 하세요!","Success",true)
            }else{
              _this.dialogOpen('alertOpen',"중복되는 아이디가 았습니다.아이디를 변경해주세요","Error")
            }
          });

      }

  render (){

    const { classes } = this.props;
    return (
    <div className={classes.root}>
    <Grid container spacing={16} style={{margin:"initial"}}>
        <Grid item xs={12}>
        <TextField
          id="ID"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="ID"
          onChange={this.handleChange('ID')}
          type="text"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              }
          }}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={()=>this.handleClickShowPassword('showPassword')}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="confirmPassword"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          value={this.state.confirmpassword}
          onChange={this.handleChange('confirmPassword')}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={()=>this.handleClickShowPassword('showConfirmPassword')}
                >
                  {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Grid>
        <Grid item xs={12}>
        <Button onClick={this.signUp} variant="contained" color="primary" className={classes.button}>
        submit
      </Button>
        </Grid>
        
      
        </Grid>
        <Dialog maxWith="xs" close={()=>this.dialogClose('alertOpen')} open={this.state.alertOpen} title ={this.state.alertTitle} content={this.state.alertContent}  button={[{name:'OK',func:()=>{this.dialogClose('alertOpen');if(this.state.signUp===true&&this.props.submitCallback){
                this.props.submitCallback();
              }}}]}></Dialog>
      
    </div>);
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
