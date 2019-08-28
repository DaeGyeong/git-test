import React, { Component } from 'react';
import MainLogo from '../logo/main-logo';
import Header from '../header/header';
import SectionOne from '../section/sectionOne';
import RecommendBook from '../recommend-book/recommend-book';
import Movies from '../movies';
import '../../assets/css/main.css';
// import Movies  from'../movies'
class Compose extends Component {
  render() {
    return (
        <>
          <Header />
          <MainLogo></MainLogo>
          <SectionOne></SectionOne>
          <RecommendBook></RecommendBook>
          <Movies /> 
          
        </>
    );
  }
}

export default Compose;
