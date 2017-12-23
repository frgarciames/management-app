// ----- styles/index.js
import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

export default () => injectGlobal`
  ${styledNormalize}

  body {
    padding: 0;
  }
`;
