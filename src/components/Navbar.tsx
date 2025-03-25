import {Button, Container, Nav, Navbar as NavbarBoot} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Navbar() {
    return (
        <NavbarBoot className='bg-black shadow-sm mb-3'>
            <Container>
                <Nav className='m-auto'>
                   <Nav.Link className='navStyle' to="/" as={NavLink}>
                        Home
                   </Nav.Link>
                   <Nav.Link className='navStyle' to="/Explore" as={NavLink}>
                        Explore
                   </Nav.Link>
                   <Nav.Link className='navStyle' to="/Map" as={NavLink}>
                        Map
                   </Nav.Link>
                   <Nav.Link className='navStyle' to="/Profile" as={NavLink}>
                        Profile
                   </Nav.Link>
                </Nav>
            </Container>
        </NavbarBoot>
    )
}