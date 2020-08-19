import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';

import CodeBlockCopyButton from './copyButton';
import CodeBlockBadge from './badge';
import CodeBlockFilename from './filename';

const Wrapper = styled.div`
  margin: 0.5em 0 1.25em;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  font-size: 14px;
`;

const Pre = styled.pre`
  margin: 0;
  position: relative;
  overflow-x: auto;
  border-radius: 0;
  padding: 2em 1em 1em;
  font-size: 14px;
  line-height: 1.5em;
`;

const Codes = styled.div`
  margin-top: 1em;
  line-height: 1.5em;

  div {
    min-height: 1.5em;
  }
`;

const CodeBlock: React.FC<any> = ({ codeString, language, filename }) => {
  return (
    <Wrapper>
      {filename && <CodeBlockFilename filename={filename} />}

      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className}>
            <CodeBlockBadge language={language} />
            <CodeBlockCopyButton code={codeString.replace(/^\s*|\s*$/g, '')} />
            <Codes>
              {tokens.map((line, i) => (
                <div {...{ ...getLineProps({ line, key: i }), style: {} }}>
                  {line.map((token, key) => (
                    <span
                      {...{ ...getTokenProps({ token, key }), style: {} }}
                    />
                  ))}
                </div>
              ))}
            </Codes>
          </Pre>
        )}
      </Highlight>
    </Wrapper>
  );
};

export default CodeBlock;
