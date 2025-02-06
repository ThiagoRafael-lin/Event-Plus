import React from 'react';
import "./ContactSection.css"
import Title from '../Title/Title';
import contatoMap from "../../Assets/images/contato-map.png"
const ContactSection = () => {
    return (
        <section className='contato'>
            <Title titleText={"contato"}/>
            <div className='contato__endereco-box'>
                <img
                    className='contato__img-map' 
                    src={contatoMap}  
                    alt="Imagem ilustrativa de um mapa" />
                <p>
                    Rua Niterói, 180 - Centro <br />
                    São Caetano do Sul - SP <br />
                    <a 
                        className='contato__telefone'
                        href="tel:+551142252000">(11) 4225-2000
                    </a>
                </p>
            </div>
        </section>
    );
};

export default ContactSection;