import React, { useState } from 'react';
import './TestPage.css'
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

const TestPage = () => {//instância do objeto
    const [total, setTotal] = useState();
    const [n1, setN1] = useState();
    const [n2, setN2] = useState();

    function handleSomar(e) {//chamar no submit do form por isso handle
        e.preventDefault(); 
        setTotal( parseFloat(n1) + parseFloat(n2));
    }
    return (
        <>
        
        <h1>Página de Testes</h1>
        <h2>Calculator</h2>
        <form onSubmit={handleSomar}>
            <Input 
                type="number"
                id="numero1"
                name="numero1"
                placeholder="Primeiro Número"
                value={n1}
                fnAltera={setN1}
            />
            <br /> 
            <Input 
                type="number"
                id="numero2"
                name="numero2"
                placeholder="Segundo Número"
                value={n2}
                fnAltera={setN2}

            />
            <br />
            <Button 
                type="submit"
                nameButton="Somar"
            />
            <p>Resultado: <strong>{total}</strong></p>
        </form>
        </>//strong seria uma forma de passar um valor dentro de um paragrafo
    );
};

export default TestPage;