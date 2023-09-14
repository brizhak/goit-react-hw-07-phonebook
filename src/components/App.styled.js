import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  padding: 7px;
  font-size: 25px;
  transition: all 0.3s;

  &.active {
    background-color: #6f4785;
    color: #d8cce7;
  }
`;
