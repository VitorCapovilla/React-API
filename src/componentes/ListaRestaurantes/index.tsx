import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [PaginaProximo, setPaginaProximo] = useState('')

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
    .then(resposta => {
      setRestaurantes(resposta.data.results)
      setPaginaProximo(resposta.data.next)
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  const verProxima = () => {
    axios.get<IPaginacao<IRestaurante>>(PaginaProximo)
    .then(resposta => {
      setRestaurantes([...restaurantes, ...resposta.data.results])
      setPaginaProximo(resposta.data.next)
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {PaginaProximo && <button onClick={verProxima}>Próxima</button>}
  </section>)
}

export default ListaRestaurantes