import {styled} from "styled-components"
import CampoTexto from "../CampoTexto/index"

const HeaderEstilizado = styled.header`
    padding: 3px 0;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0%;
    img{
        max-width: 212px;
    }
`

const Cabecalho = () => {
    return (<HeaderEstilizado>
        <img src="/imagens/logo.png" alt="" />
        <CampoTexto/>
    </HeaderEstilizado>)
}

export default Cabecalho;