import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import { FiChevronLeft } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import logoImg from '../../assets/logo.svg';

import { Container, SplitContent } from './styles';

interface HaederProps {
  toggleTheme(): void;
}

const Header: React.FC<HaederProps> = ({ toggleTheme }) => {
  const history = useHistory();
  const { pathname } = history.location;

  const { title } = useContext(ThemeContext);

  return (
    <>
      <Container>
        <div>
          <img src={logoImg} alt="GitHub Explorer" />
          <strong>Covid-19 Brazil</strong>
        </div>
        <SplitContent>
          {pathname !== '/' && (
            <Link to="/">
              <FiChevronLeft size={16} />
              Voltar
            </Link>
          )}
          <Switch
            onChange={toggleTheme}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor="#999"
            onHandleColor="#534F5E"
            offHandleColor="#534F5E"
            onColor="#F4EDE8"
          />
        </SplitContent>
      </Container>
    </>
  );
};

export default Header;
