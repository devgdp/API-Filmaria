import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify';

import api from '../../services/api';
import './filme-info.css';

export default function Filme(){
    const {id} = useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            if(response.data.length === 0 ){
                // Filme não existe redireciona Rota
                toast.error('Filme não existe, voçê foi redirecionado para pagina inicial')
                history.replace('/');
                return;
            }
            setFilme(response.data);
            setLoading(false);
        }
    
        loadFilmes();

        // return () =>{
        //     console.log('componente desmontado')
        // }

    }, [id, history]);
    

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        // se ja tiver o filme salvo 
        const hasFilme = filmesSalvos.some( (filmesSalvo) =>  filmesSalvo.id === filme.id )

        if(hasFilme){
            toast.error('Este filme já foi salvo');
            // history.replace('/')
            return;
            // para execução do código aqui 
        }

        filmesSalvos.push(filme);

        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo em seu favoritos');
        history.replace('/favoritos')
    }


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando seu filme...</h1>
            </div>
        );  
    }

    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}
            
            <div className="botoes">
                <button onClick={salvaFilme}>Salvar</button>
                <a href={`https://youtube.com/results?search_query=${filme.nome} Trailer`} target='blank'>
                Trailer
                </a>
            </div>
        </div>

    );
}