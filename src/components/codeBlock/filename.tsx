import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px 5px;
  font-size: 0.85em;
  font-family: monospace;
`;

const CodeBlockFilename: React.FC<{ filename: string }> = ({ filename }) => (
  <StyledDiv className="code-block-title">{filename}</StyledDiv>
);

export default CodeBlockFilename;
