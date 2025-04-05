import {/*Button,*/ Container, Nav, Navbar as NavbarBoot} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Navbar() {
    return (
        <NavbarBoot className='bg-gray-500 mb-3 w-full' expand="lg">
            <Container fluid>
                <Nav className='w-100 d-flex justify-content-evenly'>
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