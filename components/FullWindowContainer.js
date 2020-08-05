/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import emotionReset from 'emotion-reset';

const fullWindowStyle = css({
  width: '100vw',
  height: '100vh',
});

const FullWindowContainer = ({ children }) => (
  <div css={fullWindowStyle}>{children}</div>
);

export default FullWindowContainer;
