import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  font-size: 0.8em;
  font-family: 'Roboto';
  letter-spacing: 0.15em;
  line-height: 1;
  position: absolute;
  left: 1.5em;
  text-transform: uppercase;
  top: 0;
  padding: 0.25rem 0.5rem;
  background-color: #2b35ffca;
  border-radius: 0 0 4px 4px;
  color: #fff;
  text-shadow: none;
`;

const CodeBlockBadge: React.FC<{ language: string }> = ({ language }) => (
  <StyledDiv className={`code-block-badge code-block-badge-${language}`}>
    {language}
  </StyledDiv>
);

export default CodeBlockBadge;
