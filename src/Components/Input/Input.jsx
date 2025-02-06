import './Input.css'

const Input = (props) => {//construtor
    // const [meuValor, setMeuvalor] = useState();//Dado/estado de um componente,array em javascript funciona como um objeto propriedade(meuValor) e acessor(setMeuValor)
    return (
        <div>
                <input 
                type={props.type}
                id={props.id}
                name={props.name}
                placeholder={props.placeholder} 
                value={props.value}
                onChange={(e)=>{//ao alterar ele é capturado e passsado, mudar valor
                    
                    //setMeuvalor(e.target.value)
                    props.fnAltera(e.target.value)
                    
                }}
            />
            <span>{props.value}</span>
        </div>
    );
};

export default Input;