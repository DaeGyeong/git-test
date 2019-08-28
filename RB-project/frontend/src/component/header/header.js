import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function Header() {
    return (
			<WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
				};
				const redirect = (e)=>{
					window.location.href=window.location.href+e.currentTarget.getAttribute('link')
				}
				return(
					<React.Fragment>
			<header id="header" className="header">
				<div className="inner">
					<a href="/" className="a logo">Read Bear</a>
					<nav id="nav" className="nav">
						<a className="a" href="/">Home</a>
						<a className="a" href="/blog">Blog</a>
						<a className="a" href="/">About</a>
					</nav>
					<a aria-owns={open ? 'render-props-menu' : undefined}
              aria-haspopup="true"
              onClick={(e) => {e.preventDefault();updateAnchorEl(e.currentTarget);}} href=" " className="a navPanelToggle">
					<span  className="span fa fa-bars"></span>
					</a>
					<Menu style={{zIndex:"50000"}} id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
					<MenuItem link="" onClick={redirect}>Home</MenuItem>
				  <MenuItem link="blog" onClick={redirect}>Blog</MenuItem>
					<MenuItem link="" onClick={redirect}>About</MenuItem>
            </Menu>
					
				</div>
				
			</header>
			</React.Fragment>
      
		);
	}}
		</WithState>
		);

}

export default Header;
