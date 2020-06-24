import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FindCases from '../pages/FindCases';
import CasesDescription from '../pages/CasesDescription';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={FindCases} />
      <Route
        path="/cases-description/:repository"
        component={CasesDescription}
      />
    </Switch>
  );
};

export default Routes;
