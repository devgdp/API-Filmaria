import './Errors.css';

export default function NotFound() {
    return(
        <div className="container-error">
            <h1>404 - NOT FOUND</h1>
            <h1>Nos desculpe, esta pagina nao foi encontrada</h1>
            <a href="/" >Veja todos os filmes.</a>
        </div>
    );
}
