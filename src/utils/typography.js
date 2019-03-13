import Typography from "typography"
import theme from "typography-theme-alton"
import gray from "gray-percentage"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

// delete altonTheme.googleFonts

theme.baseFontSize = "16px"
theme.googleFonts = [
  {
    name: "Prompt",
    styles: ["600"],
  },
  {
    name: "Open Sans",
    styles: ["400", "400i", "700", "700i"],
  },
]
theme.headerFontFamily = ["Prompt", "sans-serif"]
theme.overrideStyles = ({ adjustFontSizeTo, scale, rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6": {
    lineHeight: 1.1,
    marginTop: rhythm(1 / 2),
  },
  a: {
    color: "#333",
    textDecoration: "none",
  },
  "a:hover,a:active": {
    color: options.bodyColor,
  },
  "p img": {
    marginTop: rhythm(3 / 4),
  },
  blockquote: {
    ...scale(1 / 5),
    color: gray(41),
    fontStyle: "italic",
    paddingLeft: rhythm(13 / 16),
    marginLeft: 0,
    marginTop: rhythm(1),
    marginBottom: rhythm(1),
    borderLeft: `${rhythm(3 / 16)} solid ${gray(10)}`,
  },
  "blockquote > :last-child": {
    marginBottom: 0,
  },
  "blockquote cite": {
    ...adjustFontSizeTo(options.baseFontSize),
    color: options.bodyColor,
    fontWeight: options.bodyWeight,
  },
  "blockquote cite:before": {
    content: '"— "',
  },
  [MOBILE_MEDIA_QUERY]: {
    html: {
      fontSize: `${(16 / 16) * 100}%`,
    },
    blockquote: {
      marginLeft: rhythm(-3 / 4),
      marginRight: 0,
      paddingLeft: rhythm(9 / 16),
    },
  },
})

const typography = new Typography(theme)

// const typography = new Typography({
//   baseFontSize: '18px',
//   baseLineHeight: 1.666,
//   headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
//   bodyFontFamily: ['Georgia', 'serif'],
//   // See below for the full list of options.
// })

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
