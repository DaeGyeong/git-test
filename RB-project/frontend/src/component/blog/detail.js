import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import img from '../../assets/images/human.png'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip'
import {withSnackbar} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from "../dialog";
import {Redirect} from "react-router-dom"


class MakeItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      message:this.props.data.message,
      edit:false,
      open:false,
    }
  }
  changeStatus = () => {
    this.setState({edit:!this.state.edit})
  }
  inputChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
      })
  }
  delDialogOpen = () => {
    this.setState({ open : true,
                    title :'delete comment',
                    content:'댓글을 삭제 하시겠습니까?',
                    button: [{name:'CANCLE',func:()=>{this.dialogClose();}},{name:'CONFIRM',func:()=>{this.dialogClose();this.props.delete(this.props.data.id);}}]
                  });
  }

  modifyDialogOpen = () => {
    this.setState({ open : true,
                    title :'modify comment',
                    content:'댓글을 수정 하시겠습니까?',
                    button: [{name:'CANCLE',func:()=>{this.dialogClose();}},{name:'CONFIRM',func:()=>{this.dialogClose();this.props.edit(this.props.data.id,this.state.message);}}]
                  });
  }

  dialogClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { data,classes } = this.props;
      return (
        <ListItem alignItems="flex-start">
        <ListItemAvatar style={this.state.edit?{marginRight:'10px'}:{}}>
          <Avatar alt="Remy Sharp" src={img} />
        </ListItemAvatar>
        {
          this.state.edit?(
            <ListItemText style={{width:'75%',padding:0}}
            primary={<Input name="message"
            placeholder=""
            style={{width:'100%'}}
            value={this.state.message}
            className={classes.input}
            onChange={this.inputChange}
            inputProps={{
            'aria-label': 'Description',
            }}
            />}
            
          />
            
          ):(<ListItemText
            primary={data.creator.username}
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  {data.message}
                </Typography>
                <p className={classes.date}>
                {new Date(data.updated_at).toUTCString()}</p>
              </React.Fragment>
              
            }
          />)
        }
        {
          this.state.edit?(
            <><Tooltip title="Save">
        <IconButton onClick={this.modifyDialogOpen} aria-label="Save">
              <Icon>send</Icon>
            </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
            <IconButton onClick={this.changeStatus} aria-label="Cancel">
            <Icon>reply</Icon>
            </IconButton>
        </Tooltip></>
          ):(localStorage.username===data.creator.username?(<><Tooltip title="Modified">
          <IconButton onClick={this.changeStatus} aria-label="Modified">
                <Icon>edit</Icon>
              </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
              <IconButton onClick={this.delDialogOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
          </Tooltip></>):'')
        }
        
        
        <Dialog maxWith="xs" close={this.dialogClose} open={this.state.open} title ={this.state.title} content={this.state.content}  button={this.state.button}></Dialog>
       
      </ListItem>
      )
  }
}

MakeItem.propTypes = {
  classes: PropTypes.object.isRequired
};


const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 17,
    borderTop:'1px solid #eee',
    '&:nth-child(1)': {
        borderRight:'1px solid #eee',
        backgroundColor: theme.palette.common.white,
        color: '#3f4dbc',
        
    }
  },
  body: {
    fontSize: 14,
    minHeight:'300px',
    '&:nth-child(odd)': {
        'border-right':'1px solid #eee',
        backgroundColor: theme.palette.common.white,
        color: '#3f4dbc',
        fontSize: 17,
        'fontWeight':500
    }
  },
}))(TableCell);

const styles = theme => ({
  root: {
    minHeight:'470px',
    width: '90%',
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 3,
    marginLeft:'auto',
    marginRight:'auto',
    overflowX: 'auto',
  },
  info:{
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5,
    width:'90%',
    minHeight: '30px',
    margin:'auto',
    fontSize:'20px',
    textAlign:'right',
    
  },
  infoStr:{
    float:'right'
  },
  infoButton:{
    float:'left'
  },
  input:{
   
    width:'100%',
    marginTop:'10px',
  },
  inline: {
    display: 'inline',
  },
  date:{
    float: 'right',
    fontSize: '10px'
  },
  button:{
    marginLeft: '12px',
    marginRight:'12px',
    width: '84px',
    float:'right',
    marginTop: '10px'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
//   table: {
//     minWidth: 700,
//   },
});


MakeItem= withStyles(styles)(MakeItem);
class CustomizedTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        viewName:this.props.viewName,
        goList:false,
         commentStatus : 'ready',
         status:'ready',
         id:this.props.id,
         comment:"",
         alertOpen:false,
         delComment:'',
         data:{
             contents:'',
             title:'',
             creator:{

             },
             comments:[]
        }
        }
      }
      
      goList = () => {
        this.setState({goList:true})
      }
      setDelComment = id =>{
        this.setState({delComment:id})
      }
      replyDialogOpen = () => {
        this.setState({ alertOpen : true,
             alertTitle : "Comment" ,
             alertContent: '댓글을 작성 하시겠습니까?' ,
             alertButton:[{name:'CANCLE',func:()=>{this.dialogClose()}},{name:'CONFIRM',func:()=>{this.dialogClose();this.replyComment();}}]
        });
      };
       
      dialogClose = () => {
        this.setState({ alertOpen : false });
      };
      handleClickVariant = (message,variant) => {
        // variant could be success, error, warning or info
        this.props.enqueueSnackbar(message+" "+variant +"!", { variant });
      };
      inputChange=(e)=>{
        this.setState({
              [e.target.name]: e.target.value
          })
      }
      inputDataChange=(e)=>{
        this.setState({
            data:{
              ...this.state.data,
              [e.target.name]: e.target.value
            }
          })
      }

      componentDidMount() {
        if(this.state.viewName==="detail"){
        this._getBoardList();
        }
       
      }
      createBoard = () =>{
        this.setState({ alertOpen : true,
          alertTitle : "Create" ,
          alertContent: '글을 작성 하시겠습니까?' ,
          alertButton:[{name:'CANCLE',func:()=>{this.dialogClose()}},{name:'CONFIRM',func:()=>{this.dialogClose();this._calCreateBoardApi();}}]
        });
        //this.setState({
          //viewName:'detail'
        //})
        
      }
      modifyBoard = () => {
        this.setState({ alertOpen : true,
          alertTitle : "Modify" ,
          alertContent: '글을 수정 하시겠습니까?' ,
          alertButton:[{name:'CANCLE',func:()=>{this.dialogClose()}},{name:'CONFIRM',func:()=>{this.dialogClose();this._calModifyBoardApi();}}]
        });
      }
      delBoard = () => {
        this.setState({ alertOpen : true,
          alertTitle : "delete" ,
          alertContent: '글을 삭제 하시겠습니까?' ,
          alertButton:[{name:'CANCLE',func:()=>{this.dialogClose()}},{name:'CONFIRM',func:()=>{this.dialogClose();this._calDelBoardApi();}}]
        });
      }
      goDetail = () => {
        this.setState({
          viewName:'detail',
          commentStatus : 'ready',
          status:'ready'
        });
        this._getBoardList();
      }
      changeViewName = (name) =>{
        this.setState({
          viewName: name
        })
      }
      deleteComment = (id) =>{
        this.setState({
          commentStatus:'ready'
        })
        this._callDelCommentApi(id);
      };

      modifyComment = (id,message) =>{
        this.setState({
          commentStatus:'ready'
        })
        this._callEditCommentApi(id,message);
      };

      replyComment = async () => {
        const result = this.state.comment
        this.setState({         
          comment:'',
          commentStatus:'ready'
        })
        this._callCommentApi(result);
      };
      _calDelBoardApi = () => {
        let _this=this;
        fetch("/board/public/"+this.state.id, {
          method: "DELETE",
          headers: {
            'Authorization': 'jwt '+localStorage.token
                    }
          
          
      })
      .then(function(response){
        if(response.status===204){
            _this.handleClickVariant('delete','success');
            _this.goList();
        }else{
            _this.handleClickVariant('delete','error');
        }
      })
      .catch(err => console.log(err));
      }
      _calModifyBoardApi = () => {
        let _this=this;
        this.setState({
          commentStatus : 'ready',
          status:'ready',
          viewName:'detail'
        })
        fetch("/board/public/"+this.state.id, {
          method: "PUT",
          headers: {
            'content-type': 'application/json',
            'Authorization': 'jwt '+localStorage.token
                    },
          body:JSON.stringify({
            title : _this.state.data.title,
            contents : _this.state.data.contents
          })
          
          
      })
      .then(function(response){
        if(response.status===200){
            _this.handleClickVariant('modify','success');
            _this._getBoardList();
        }else{
            _this.handleClickVariant('modify','error');
        }
      })
      .catch(err => console.log(err));
      }
      _calCreateBoardApi = async () => {

        let _this=this;
        this.setState({
          commentStatus : 'ready',
          status:'ready',
          viewName:'detail'
        })
        const result= await fetch("/board/public", {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'Authorization': 'jwt '+localStorage.token
                    },
          body:JSON.stringify({
            title : _this.state.data.title,
            contents : _this.state.data.contents
          })
          
      })
      .then(function(response){
        
        if(response.status===201){
            _this.handleClickVariant('create','success');
            return response.json()
        }else{
            _this.handleClickVariant('create','error');
        }
        
    }).then( json => {
      return json
    })
        .catch(err => console.log(err));

        this.setState({
          id:result.id
        })
        this._getBoardList();
      }

      _callDelCommentApi = (id) => {
        let _this=this;
        return fetch("/board/public/"+this.state.id+"/comment/"+id, {
            method: "DELETE",
            headers: {
			'Authorization': 'jwt '+localStorage.token
              }
            
        })
        .then(function(response){
            if(response.status===204){
                _this.handleClickVariant('delete','success');
                _this._getBoardList();
            }else{
                _this.handleClickVariant('delete','error');
            }
            
        })
          .catch(err => console.log(err));
          
          
      };

      _callEditCommentApi = (id,message) => {
        let _this=this;
        return fetch("/board/public/"+this.state.id+"/comment/"+id, {
            method: "PUT",
            headers: {
              'content-type': 'application/json',
			'Authorization': 'jwt '+localStorage.token
              },
              body:JSON.stringify({
                message : message
              })
            
        })
        .then(function(response){
            if(response.status===200){
                _this.handleClickVariant('Modified','success');
                _this._getBoardList();
            }else{
                _this.handleClickVariant('Modified','error');
            }
            
        })
          .catch(err => console.log(err));
      };

      _callCommentApi = (result) => {
        let _this=this;
        if(result!==""){
            return fetch("/board/public/"+this.state.id+"/comments", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                'Authorization': 'jwt '+localStorage.token
                  },
                  body:JSON.stringify({
                    message:result
                  })
                
            })
            .then(function(response){
                if(response.status===201){
                    _this.handleClickVariant('reply','success');
                    _this._getBoardList();
                }else{
                    _this.handleClickVariant('reply','error');
                }
                
            })
              .catch(err => console.log(err));
        }else{
            alert("댓글을 입력해주세요");
        }
       
      };
      
      _getBoardList = async () => {
        let data=await this._callApi()
        if(data!==undefined){
          
          data.comments=data.comments.reverse();
          this.setState({
            commentStatus:'done',
            status:'done',
            data: data
           });
        }
      };

      _callApi = () => {
        const _this=this;
        return fetch("/board/public/"+this.state.id, {
            method: "GET",
            headers: {
			'Authorization': 'jwt '+localStorage.token
              }
            
        })
          .then(res => res.json())
          .then( json => {
              return json
          })
          .catch(err => {console.log(err);
            _this.setState({
            status:'error',
           });});
      };
   
      
    
  render(){
    const { classes } = this.props;
    if(this.state.goList===true){
      return(<Redirect to={{pathname:"/blog",state:{page:this.props.page,order:this.props.order,orderBy:this.props.orderBy}}}></Redirect>)
    }else{
    return (
        <>
        <div className={classes.info}>
        {
       (this.state.viewName==='detail')?(<Button onClick={this.goList} size="small" variant="contained" color="primary" className={classes.infoButton}>
       <Icon>undo</Icon>
    </Button>):(<div style={{width:'100%',display:'inline-flex'}}><div style={{textAlign:'left',width:'100%',marginTop:'auto',marginBottom:'auto'}}>{this.state.viewName==='create'?"Write a new post":"Modify post"}</div><Tooltip title="Save">
          <IconButton onClick={this.state.viewName==='create'?this.createBoard:this.modifyBoard} aria-label="Save">
                <Icon >save</Icon>
              </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
              <IconButton onClick={this.state.viewName==='create'?this.goList:this.goDetail} aria-label="Cancel">
              <Icon>reply</Icon>
              </IconButton>
          </Tooltip></div>)
      }
        
      {
       (this.state.viewName==='detail'&&this.state.status==='done'&&<p className={classes.infoStr}>Written by {this.state.data.creator.username} on {new Date(this.state.data.updated_at).toDateString()} {
        (this.state.data.creator.username===localStorage.username&&<><Tooltip title="Modified">
        <IconButton onClick={()=>this.changeViewName('modify')} aria-label="Modified">
              <Icon>edit</Icon>
            </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
            <IconButton onClick={this.delBoard} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
        </Tooltip></>)
      }</p>)
      }
      
      </div>
        <Paper style={this.state.viewName!=='detail'?{minHeight:'0'}:{}} className={classes.root}>
        {
                  (() => {
                  if(this.state.viewName==='detail'&&this.state.status==='ready') {
                    return (  <LinearProgress style={{ marginTop: '225px'}} />)
                  }else if(this.state.viewName==='detail'&&this.state.status==='error'){
                    return (  <p style={{ marginTop: '210px',    fontSize: '30px',
                    textAlign: 'center'}} >No data</p>)
                  }
                  else return (<Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <CustomTableCell style={{width:'30%'}}>Title</CustomTableCell>
                        <CustomTableCell style={{width:'70%'}} align="center">
                        
                        {this.state.viewName==='detail'?(this.state.data.title):(
                          <Input name="title"
                          placeholder=""
                          style={{width:'100%'}}
                          value={this.state.data.title}
                          
                          //className={classes.input}
                          onChange={this.inputDataChange}
                          inputProps={{
                          'aria-label': 'Description',
                          }}
                          />
                        )}
                         
                        </CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.row}>
                          <CustomTableCell component="th" scope="row">
                            Contents
                          </CustomTableCell>
                          <CustomTableCell align="center">
                          
                          
                        {this.state.viewName==='detail'?(<div style={{'textAlign':'left','minHeight': '300px',margin: '10px'}}>{this.state.data.contents}</div>):(
                          <Input name="contents"
                          placeholder=""
                          style={{width:'100%',marginBottom:'10px'}}
                          value={this.state.data.contents}
                          multiline
                          rows="15"
                          //className={classes.input}
                          onChange={this.inputDataChange}
                          inputProps={{
                          'aria-label': 'Description',
                          }}
                          />
                        )}
                                   
                          </CustomTableCell>
                         
                        </TableRow>
                        {
                            this.state.viewName==="detail"?(<TableRow className={classes.row}>
                              <CustomTableCell component="th" scope="row">
                                comments
                                </CustomTableCell>
                                
                                <CustomTableCell align="center"><List>
                                {
                                  
                                  (() => {
                                    if(this.state.commentStatus==='ready') {
                                      return (<CircularProgress className={classes.progress} />)
                                    }
                                    else {
                                      return (this.state.data.comments.map(
                                        (row,i) => (
                                          <MakeItem 
                                          key={i}
                                          data={row}
                                          delete={this.deleteComment}
                                          edit={this.modifyComment}
                                          />
                                            
                                        )
                                    ));
                                    }
                                    })()
                              } 
                              <ListItem alignItems="flex-start">
                                      <ListItemAvatar style={{marginRight:'10px'}}>
                                        <Avatar alt="Remy Sharp" src={img} />
                                      </ListItemAvatar>
                                      <Input name="comment"
                                  placeholder=""
                                  value={this.state.comment}
                                  className={classes.input}
                                  onChange={this.inputChange}
                                  inputProps={{
                                  'aria-label': 'Description',
                                  }}
                                  />  <Button onClick={this.replyDialogOpen} size="small" variant="contained" color="primary" className={classes.button}>
                                  Reply
                                </Button>
                                    </ListItem>
                               </List>
                               
                                   
                              
                                    </CustomTableCell>
                                </TableRow>):''
                          }
                        
                    </TableBody>
                    <Dialog maxWith="xs" close={this.dialogClose} open={this.state.alertOpen} title={this.state.alertTitle} content={this.state.alertContent} button={this.state.alertButton} ></Dialog>
                    
                  </Table>)
                  })()
        }
          
          
        </Paper>
        </>
      );
      }
  }
  

}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};



 
  export default withSnackbar(withStyles(styles)(CustomizedTable));