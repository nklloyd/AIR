import {/*Button,*/ Container, Nav, Navbar as NavbarBoot} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Navbar() {
    return (
        <NavbarBoot className='bg-slate-200 shadow-sm mb-auto h-10'>
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
                </Nav>
            </Container>
        </NavbarBoot>
    )
}