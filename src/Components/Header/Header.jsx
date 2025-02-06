import React, { useState } from 'react';
import './Header.css'
import Container from '../Container/Container';
import Nav from '../Nav/Nav';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';
import menuBar from '../../Assets/images/menubar.png'
const Header = () => {
    const [exibeNavbar, setExibeNavbar] = useState(false);
    //console.log(`Exibe a navbar? ${exibeNavbar}`);
    return (
        <header className='headerpage'>
            <Container>
                <div className='header-flex'>
                    <img 
                    src={menuBar} 
                    className='headerpage__menubar'
                    alt="Imagem menu de barras. Serve para exibir ou esconder o menu no smartphone" 
                    onClick={ () => { setExibeNavbar(true) }}
                    />

                <Nav 
                setExibeNavbar={setExibeNavbar}
                exibeNavbar={exibeNavbar}
                />
                <PerfilUsuario />

                </div>
            </Container>
        </header>
    );
};

export default Header;