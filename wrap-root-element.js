import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './src/components/codeBlock';
import { preToCodeBlock } from 'mdx-utils';

export const wrapRootElement = (() => {
  const components = {
    pre: (preProps) => {
      const props = preToCodeBlock(preProps);

      if (props) {
        return <CodeBlock {...props} />;
      }
      return <pre {...preProps} />;
    },
  };

  return ({ element }) => (
    <MDXProvider components={components}>{element}</MDXProvider>
  );
})();
