import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

import { Title, Form, Repositories, Error } from './styles';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  uf: string;
  state: string;
  cases: string;
}

const FindCases: React.FC = () => {
  const [newCase, setNewCase] = useState('');
  const [inputError, setInputError] = useState('');
  const [cases, setCases] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@Covid19:cases');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@Covid19:infos', JSON.stringify(cases));
  }, [cases]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newCase) {
      setInputError('Digite a UF corretamente: ex SP or RS');
      return;
    }

    try {
      const response = await api.get<Repository>(
        `/api/report/v1/brazil/uf/${newCase}`,
      );

      setCases([...cases, response.data]);
      setInputError('');
      setNewCase('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <Helmet>
        <title>Covid-19 Monitor | Home</title>
      </Helmet>
      <Title>Digite a UF e obtenha info sobre os dados da Covid-19</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite a uf"
          value={newCase}
          onChange={e => setNewCase(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {cases.map(casest => (
          <Link key={casest.state} to={`/cases-description/${casest.uf}`}>
            <img src={logo} alt="Pick" />
            <div>
              <strong>{casest.state}</strong>
              <p>Número de casos: {casest.cases}</p>
            </div>

            <FiChevronRight size={20} color="#cbcbd6" />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default FindCases;
