import React, { Component } from 'react';
import Blog from '../blog/blog'
import Header from '../header/sub_header'
import Dialog from '../dialog'
class Compose extends Component {
  state ={
    alertOpen:localStorage.getItem("username")?false:true,
    page:this.props.location.state?this.props.location.state.page:0,
    order:this.props.location.state?this.props.location.state.order:'desc',
    orderBy:this.props.location.state?this.props.location.state.orderBy:'date'
  }
  dialogOpen = () => {
    this.setState({ alertOpen: true });
  };

  dialogClose = () => {
    this.setState({ alertOpen: false });
  };
  render() {
    return (
        <>
          <Header name="Blog" menu={false}></Header>
          <Blog page={this.state.page} order={this.state.order} orderBy={this.state.orderBy}></Blog>
          <Dialog open={this.state.alertOpen} close={this.dialogClose} title ="SignIn!!" content="Sign in by clicking the button in the top right corner" button={[{name:'CLOSE',func:this.dialogClose}]}></Dialog>                  
 
        </>
    );
  }
}

export default Compose;
