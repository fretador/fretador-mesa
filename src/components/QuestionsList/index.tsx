import React from "react";
import styles from './QuestionList.module.css'

const QuestionList = () => {
  return (
    <>
      <ol className={styles.customList}>
        <li>
          Fretes em andamento:
          <ul className={styles.customList}>
            <li>O que significa &quot;fretes em andamento&quot;?</li>
            <li>Como posso ver mais detalhes dos fretes em andamento?</li>
            <li>O que fazer se um frete em andamento não estiver atualizado?</li>
          </ul>
        </li>

        <li>
          Ocorrências:
          <ul>
            <li>O que constitui uma &quot;ocorrência&quot; no sistema?</li>
            <li>Como posso visualizar mais informações sobre as ocorrências?</li>
            <li>Como registrar uma nova ocorrência?</li>
          </ul>
        </li>

        <li>
          Novos cadastros:
          <ul>
            <li>Quem pode ser cadastrado no sistema?</li>
            <li>Como faço para ver detalhes sobre os novos cadastros?</li>
            <li>Como aprovar ou reprovar novos cadastros?</li>
          </ul>
        </li>

        <li>
          Cargas em aberto:
          <ul>
            <li>O que são &quot;cargas em aberto&quot;?</li>
            <li>Qual é a diferença entre &quot;cargas em aberto&quot; e &quot;fretes em andamento&quot;?</li>
            <li>Como posso atribuir uma carga aberta a um motorista?</li>
          </ul>
        </li>

        <li>
          Fretes cancelados:
          <ul>
            <li>O que pode causar o cancelamento de um frete?</li>
            <li>Como posso ver detalhes sobre os fretes cancelados?</li>
            <li>Como reativar um frete cancelado?</li>
          </ul>
        </li>

        <li>
          Fluxo de carregamento semanal:
          <ul>
            <li>O que o gráfico de &quot;fluxo de carregamento semanal&quot; representa?</li>
            <li>Como posso visualizar os dados de semanas anteriores?</li>
            <li>Como interpreto picos de carga em determinados dias?</li>
          </ul>
        </li>

        <li>
          Fretes diários:
          <ul>
            <li>Qual a diferença entre &quot;fretes cancelados&quot; e &quot;novos fretes&quot;?</li>
            <li>Como é calculada a porcentagem de fretes cancelados?</li>
            <li>Como posso visualizar mais detalhes dos novos fretes?</li>
          </ul>
        </li>

        <li>
          Comprovantes de entrega:
          <ul>
            <li>Como faço para aprovar os comprovantes de entrega?</li>
            <li>Qual a importância dos comprovantes de entrega para o sistema?</li>
            <li>O que fazer se houver um erro nos comprovantes de entrega?</li>
          </ul>
        </li>

        <li>
          Resumo dos fretes:
          <ul>
            <li>O que significa cada status (&quot;em andamento&quot;, &quot;em aberto&quot;, &quot;finalizado&quot;)?</li>
            <li>Como posso ver uma lista detalhada de fretes com um status específico?</li>
            <li>Como mudar o status de um frete manualmente?</li>
          </ul>
        </li>

        <li>
          Adicionar novo frete:
          <ul>
            <li>Como faço para adicionar um novo frete?</li>
            <li>Quais informações são necessárias para adicionar um novo frete?</li>
            <li>Existe alguma limitação no número de fretes que posso adicionar?</li>
          </ul>
        </li>
      </ol>


    </>
  )
}

export default QuestionList