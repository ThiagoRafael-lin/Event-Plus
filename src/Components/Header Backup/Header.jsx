import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <br />
                <Link to="/eventos">Eventos</Link>
                <br />
                <Link to="/login">Login</Link>
                <br />
                <Link to="/tipo-evento">Tipos de Evento</Link>
                <br />
                <Link to="/teste-page">Testes</Link>
            </nav>
        </header>
    );
};

export default Header;