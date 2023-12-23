import Svg, { Path } from 'react-native-svg'

export function MdiPencilPlus (props: any) {
  return <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill={props.fill}
        d="M20.7 7c.4-.4.4-1 0-1.4l-2.3-2.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L19 8.9M3 17.2V21h3.8l11-11.1-3.7-3.8zM7 2v3h3v2H7v3H5V7H2V5h3V2z"
      />
    </Svg>
}

export function MdiFormatListChecks (props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill={props.fill}
        d="M3 5h6v6H3zm2 2v2h2V7zm6 0h10v2H11zm0 8h10v2H11zm-6 5l-3.5-3.5 1.41-1.41L5 17.17l4.59-4.58L11 14z"
      />
    </Svg>
  )
}
