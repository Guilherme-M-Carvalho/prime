import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme.css';
import { toast } from "react-toastify";


export default function Filmes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'a3536b3c476761dc74aa65ba36f52b0d',
          language: 'pt-BR',
          page: 1,
        }
      })
        .then((response) => {
          setFilme(response.data)
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true })
          return;
        })
    }
    loadFilme();

    return () => {
      console.log("componente foi desmontado");
    }
  }, [id, navigate])

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeflix')

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilmes = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

    if(hasFilmes){
      toast.warn("Esse filme já está na sua lista!")
      return;
    }
    
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
