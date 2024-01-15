
import { AppBar, Toolbar, styled } from "@mui/material";
import logo from './images/logo.png'

const Container = styled(AppBar)`
    background: #060606;
    position: static;
    border-bottom: 1px solid #2f2f2f;
    height: 9vh;
`;

const Header = () => {
    return(
        <Container>
            <Toolbar>
                <div className="logo">
                  <img src={logo} alt="logo" style={{ width: 100, borderRadius: 5, margin: 8 }} />
                </div>
            </Toolbar>
        </Container>
    )
}

export default Header