import React, { Component } from 'react';
import SignUp from '../signUp/signUp'
import Header from '../header/sub_header'
class Compose extends Component {
  render() {
    return (
        <>
          <Header name="SignUp" menu="false"></Header>
          <SignUp></SignUp>
        </>
    );
  }
}

export default Compose;
