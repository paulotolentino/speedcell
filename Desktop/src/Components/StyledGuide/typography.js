import { css } from "styled-components";

export const Font = {
  Family: "Roboto-Medium, sans-serif",
};

const _font = css`
  font-family: ${Font.Family};
  font-style: normal;
  display: flex;
  align-items: center;
`;

export const Fonts = {
  Titles: {
    H1: css`
      ${_font};
      font-weight: 300;
      font-size: 96px;
      line-height: 140.62%;
      letter-spacing: -1.5px;
    `,
    H2: css`
      ${_font};
      font-weight: 300;
      font-size: 60px;
      line-height: 140.62%;
      letter-spacing: -0.5px;
    `,
    H3: css`
      ${_font};
      font-weight: normal;
      font-size: 48px;
      line-height: 140.62%;
    `,
    H4: css`
      ${_font};
      font-weight: normal;
      font-size: 34px;
      line-height: 140.62%;
      letter-spacing: 0.25px;
    `,
    H5: css`
      ${_font};
      font-weight: 500;
      font-size: 24px;
      line-height: 140.62%;
    `,
    H6: css`
      ${_font};
      font-weight: 300;
      font-size: 20px;
      line-height: 140.62%;
      letter-spacing: 0.5px;
    `,
  },
  Subtitles: {
    S1: css`
      ${_font};
      font-weight: normal;
      font-size: 16px;
      line-height: 140.62%;
      letter-spacing: 0.15px;
    `,
    S2: css`
      ${_font};
      font-weight: 500;
      font-size: 14px;
      line-height: 140.62%;
      letter-spacing: 0.1px;
    `,
  },
  Body: {
    B1: css`
      ${_font};
      font-weight: normal;
      font-size: 16px;
      line-height: 140.62%;
      letter-spacing: 0.5px;
    `,
    B2: css`
      ${_font};
      font-weight: normal;
      font-size: 14px;
      line-height: 140.62%;
      letter-spacing: 0.25px;
    `,
  },
  Buttons: {
    BT1: css`
      ${_font};
      font-weight: 500;
      font-size: 14px;
      line-height: 140.62%;
      letter-spacing: 1.25px;
    `,
    BT2: css`
      ${_font};
      font-weight: 500;
      font-size: 12px;
      line-height: 140.62%;
      letter-spacing: 1px;
    `,
  },
  Captions: {
    CP: css`
      ${_font};
      font-weight: normal;
      font-size: 12px;
      line-height: 140.62%;
      letter-spacing: 0.4px;
    `,
  },
  Overline: {
    CP: css`
      ${_font};
      font-weight: normal;
      font-size: 10px;
      line-height: 140.62%;
      letter-spacing: 1.25px;
    `,
  },
};
