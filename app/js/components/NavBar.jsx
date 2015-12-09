import React from 'react';
import Navbar  from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class Header extends React.Component {
	render() {
		var Brand = (
				<a className="navbar-brand" href="#" style={{color: "#03a9f4"}}>Streets Ahead</a>
			)
		return (
				<Navbar brand={Brand} inverse toggleNavKey={0} className="">
				    <Nav right eventKey={0}> 
				      <NavItem eventKey={1} href='#'>News</NavItem>
				      <NavItem eventKey={2} href='#'>Log In</NavItem>
				    </Nav>
				</Navbar>
			)
	}
} 