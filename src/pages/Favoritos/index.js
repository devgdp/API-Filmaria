import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

import './favoritos.css';

export default function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);

    }, [])

    function handleDelete(id){
        let filtroFilmes = filmes.filter((item) => {
            return(item.id !== id)
        }) 
        
        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
        toast.success('Filme excluído com sucesso!')
    }

    return(
        <div className="container-salvos">
            <h1> Meus Filmes</h1>

            {filmes.length === 0 && <h1>Nenhum filme salvo :(</h1>}


            <div className="lista-filmes-salvos">
                {filmes.map((item)=>{
                    return(
                        <div key={item.id} className="lista">
                            <strong> {item.nome} </strong>
                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                                <button onClick={() => handleDelete(item.id)} >Excluir</button>
                            </div>
                        </div> 
                    )
                })}
            </div>
      </div>
    )
}