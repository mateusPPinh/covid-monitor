import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.svg';

import { RepositoryInfo } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  deaths: string;
  suspects: string;
  datetime: string;
  refuses: string;
  state: string;
  cases: string;
}

const CasesDescription: React.FC = () => {
  const [cases, setCases] = useState<Repository | null>(null);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [repositoryResponse] = await Promise.all([
        api.get(`/api/report/v1/brazil/uf${params.repository}`),
      ]);

      setCases(repositoryResponse.data);
    }

    loadData();
  }, [params.repository]);

  return (
    <>
      {cases && (
        <RepositoryInfo>
          <header>
            <img src={logo} alt="Logo ilustrative" />
            <div>
              <p>{cases.state}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{cases.refuses}</strong>
              <span>Nº de mortes</span>
            </li>
            <li>
              <strong>{cases.cases}</strong>
              <span>Nº de casos</span>
            </li>
            <li>
              <strong>{cases.suspects}</strong>
              <span>Casos suspeitos</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
    </>
  );
};

export default CasesDescription;
