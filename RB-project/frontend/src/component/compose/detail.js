import React, { Component } from 'react';
import Header from '../header/sub_header'
import Detail from '../blog/detail';
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
class Compose extends Component {
  state={
    viewName:this.props.location.state?this.props.location.state.viewName:'',
    id:this.props.location.state?this.props.location.state.id:'',
    page:this.props.location.state?this.props.location.state.page:0,
    order:this.props.location.state?this.props.location.state.order:'desc',
    orderBy:this.props.location.state?this.props.location.state.orderBy:'date'
  }
  render() {
    return (
        <>
        {
            (()=>{
            if(this.props.login===true&&this.state.viewName!==''){
                return (<><Header name="Blog" menu={false}></Header>
                <Detail viewName={this.state.viewName} id={this.state.id} page={this.state.page} order={this.state.order} orderBy={this.state.orderBy}></Detail>;
                </>);      
            }else{
                return (<Redirect to={{pathname:"/blog",state: { page: this.state.page,order:this.state.order,orderBy:this.state.orderBy }}}/>);   
            }
           })()
          }
          </>
    );
  }
}


const mapStateToProps = ({ login }) => ({
    login:login.login
  });


  export default connect(
    mapStateToProps
  )(Compose);
