import React from "react";

type Width = {
  width: string;
};

type Height = {
  height: string;
};

type Props = Width | Height | {};

const SvgSoftmarkLogo: React.FC<Props> = props => {
  const paths = (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.222 4H6.05A4.05 4.05 0 002 8.05v32.394a4.05 4.05 0 004.05 4.05h24.296a4.05 4.05 0 004.049-4.05V18.173L20.222 4z"
        fill="#fff"
        stroke="#1E88E5"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.222 4v14.173h14.173M28.047 26L16.922 37.125l-5.057-5.057"
        stroke="#1E88E5"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M69.72 45.6c-3.32 0-6.2-.52-8.64-1.56-2.4-1.04-4.24-2.4-5.52-4.08-1.28-1.72-1.96-3.56-2.04-5.52 0-.32.12-.6.36-.84.28-.28.6-.42.96-.42h3.06c.76 0 1.28.4 1.56 1.2.36 1.68 1.38 3.12 3.06 4.32 1.72 1.2 4.12 1.8 7.2 1.8 3.32 0 5.82-.58 7.5-1.74 1.68-1.2 2.52-2.86 2.52-4.98 0-1.36-.42-2.46-1.26-3.3-.8-.84-2-1.58-3.6-2.22-1.6-.64-4-1.44-7.2-2.4-3.12-.88-5.6-1.82-7.44-2.82-1.84-1-3.22-2.24-4.14-3.72-.92-1.48-1.38-3.34-1.38-5.58 0-2.16.58-4.1 1.74-5.82 1.2-1.72 2.9-3.06 5.1-4.02 2.2-1 4.82-1.5 7.86-1.5 3.12 0 5.8.56 8.04 1.68 2.24 1.08 3.94 2.46 5.1 4.14 1.16 1.68 1.78 3.36 1.86 5.04 0 .32-.12.6-.36.84-.2.24-.5.36-.9.36h-3.18c-.84 0-1.36-.38-1.56-1.14-.24-1.68-1.18-3.06-2.82-4.14-1.64-1.12-3.7-1.68-6.18-1.68-2.72 0-4.86.52-6.42 1.56-1.56 1.04-2.34 2.58-2.34 4.62 0 1.36.36 2.48 1.08 3.36.76.88 1.9 1.66 3.42 2.34 1.52.64 3.74 1.38 6.66 2.22 3.4.92 6.08 1.88 8.04 2.88 1.96.96 3.42 2.18 4.38 3.66.96 1.44 1.44 3.28 1.44 5.52 0 3.72-1.44 6.64-4.32 8.76-2.88 2.12-6.76 3.18-11.64 3.18zm35.324 0c-4.4 0-7.82-1.24-10.26-3.72-2.4-2.48-3.68-5.78-3.84-9.9l-.06-2.58.06-2.58c.16-4.08 1.46-7.36 3.9-9.84 2.44-2.52 5.84-3.78 10.2-3.78 4.36 0 7.76 1.26 10.2 3.78 2.44 2.48 3.74 5.76 3.9 9.84.04.44.06 1.3.06 2.58s-.02 2.14-.06 2.58c-.16 4.12-1.46 7.42-3.9 9.9-2.4 2.48-5.8 3.72-10.2 3.72zm0-4.62c2.52 0 4.5-.8 5.94-2.4 1.48-1.6 2.28-3.9 2.4-6.9.04-.4.06-1.16.06-2.28 0-1.12-.02-1.88-.06-2.28-.12-3-.92-5.3-2.4-6.9-1.44-1.6-3.42-2.4-5.94-2.4-2.52 0-4.52.8-6 2.4-1.48 1.6-2.26 3.9-2.34 6.9l-.06 2.28.06 2.28c.08 3 .86 5.3 2.34 6.9 1.48 1.6 3.48 2.4 6 2.4zM130.366 45c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02V18.6h-5.1c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02v-2.04c0-.4.12-.72.36-.96.28-.28.62-.42 1.02-.42h5.1v-3c0-6.8 3.44-10.2 10.32-10.2h3.6c.4 0 .72.14.96.42.28.24.42.56.42.96v2.04c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-3.48c-1.8 0-3.06.48-3.78 1.44-.72.92-1.08 2.34-1.08 4.26v2.7h7.74c.4 0 .72.14.96.42.28.24.42.56.42.96v2.04c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-7.74v25.02c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-2.82zm30.266 0c-6.32 0-9.48-3.52-9.48-10.56V18.6h-4.68c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02v-2.04c0-.4.12-.72.36-.96.28-.28.62-.42 1.02-.42h4.68V3.78c0-.4.12-.72.36-.96.28-.28.62-.42 1.02-.42h2.82c.4 0 .72.14.96.42.28.24.42.56.42.96V13.8h7.44c.4 0 .72.14.96.42.28.24.42.56.42.96v2.04c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-7.44v15.42c0 2 .34 3.52 1.02 4.56.68 1 1.8 1.5 3.36 1.5h3.66c.4 0 .72.14.96.42.28.24.42.56.42.96v2.16c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-4.14zm12.917 0c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02V4.44c0-.44.12-.78.36-1.02.28-.28.62-.42 1.02-.42h3c.64 0 1.16.32 1.56.96l12.66 24.24 12.78-24.24c.08-.24.24-.46.48-.66.28-.2.62-.3 1.02-.3h2.94c.44 0 .78.14 1.02.42.28.24.42.58.42 1.02v39.18c0 .4-.14.74-.42 1.02-.28.24-.62.36-1.02.36h-2.94c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02V14.1l-10.02 19.56c-.4.84-1.04 1.26-1.92 1.26h-1.86c-.88 0-1.52-.42-1.92-1.26l-10.08-19.56v29.52c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-2.94zm53.677.6c-1.96 0-3.78-.4-5.46-1.2-1.68-.8-3.02-1.88-4.02-3.24a7.995 7.995 0 01-1.44-4.62c0-2.64 1.08-4.8 3.24-6.48 2.2-1.72 5.16-2.84 8.88-3.36l8.94-1.26V23.7c0-4.08-2.34-6.12-7.02-6.12-1.76 0-3.2.38-4.32 1.14-1.12.72-1.96 1.58-2.52 2.58-.12.36-.28.62-.48.78-.16.16-.4.24-.72.24h-2.58c-.36 0-.68-.12-.96-.36-.24-.28-.36-.6-.36-.96.04-.96.48-2.04 1.32-3.24.88-1.24 2.22-2.3 4.02-3.18 1.8-.92 4.02-1.38 6.66-1.38 4.48 0 7.7 1.06 9.66 3.18 1.96 2.08 2.94 4.68 2.94 7.8v19.44c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-2.76c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02v-2.58c-.88 1.28-2.16 2.36-3.84 3.24-1.68.88-3.82 1.32-6.42 1.32zm1.26-4.5c2.6 0 4.72-.84 6.36-2.52 1.68-1.72 2.52-4.18 2.52-7.38v-1.68l-6.96 1.02c-2.84.4-4.98 1.08-6.42 2.04-1.44.92-2.16 2.1-2.16 3.54 0 1.6.66 2.84 1.98 3.72 1.32.84 2.88 1.26 4.68 1.26zm24.025 3.9c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02V15.24c0-.4.12-.74.36-1.02.28-.28.62-.42 1.02-.42h2.76c.4 0 .74.14 1.02.42.28.28.42.62.42 1.02v2.64c1.64-2.72 4.44-4.08 8.4-4.08h2.34c.4 0 .72.14.96.42.28.24.42.56.42.96v2.46c0 .4-.14.72-.42.96-.24.24-.56.36-.96.36h-3.6c-2.16 0-3.86.64-5.1 1.92-1.24 1.24-1.86 2.94-1.86 5.1v17.64c0 .4-.14.74-.42 1.02-.28.24-.62.36-1.02.36h-2.94zm22.353 0c-.4 0-.74-.12-1.02-.36-.24-.28-.36-.62-.36-1.02V3.78c0-.4.12-.72.36-.96.28-.28.62-.42 1.02-.42h2.82c.4 0 .72.14.96.42.28.24.42.56.42.96v20.88l11.82-9.84c.12-.08.32-.24.6-.48.28-.2.54-.34.78-.42.28-.08.62-.12 1.02-.12h3.18c.36 0 .66.12.9.36s.36.54.36.9c0 .44-.24.82-.72 1.14l-13.86 11.52 15.36 14.94c.48.4.72.76.72 1.08 0 .36-.12.66-.36.9s-.54.36-.9.36h-3.12c-.6 0-1.04-.06-1.32-.18-.24-.12-.6-.4-1.08-.84l-13.38-12.78v12.42c0 .4-.14.74-.42 1.02-.24.24-.56.36-.96.36h-2.82z"
        fill="#1E88E5"
      />
      <path
        d="M21.845 16.587a.1.1 0 01-.1-.101l.055-9.234a.1.1 0 01.174-.067l8.535 9.178a.1.1 0 01-.072.168l-8.592.056z"
        fill="#fff"
      />
    </>
  );

  if ("height" in props) {
    return (
      <svg height={props.height} viewBox="0 0 300 48">
        {paths}
      </svg>
    );
  } else if ("width" in props) {
    return (
      <svg width={props.width} viewBox="0 0 300 48">
        {paths}
      </svg>
    );
  } else {
    return (
      <svg height="48px" width="300px" viewBox="0 0 300 48">
        {paths}
      </svg>
    );
  }
};

export default SvgSoftmarkLogo;

// <svg width="1em" height="1em" viewBox="0 0 300 47" fill="none" {...props}>
//<svg style={{ display: "flex", width: "100%", height: "initial" }}>
