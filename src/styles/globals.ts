import styled from "@emotion/styled";

export const colors = {
  primary: {
    lightest: "#4170FC",
    light: "#1852FF",
    main: "#0040FF",
    dark: "#002FBB",
    darkest: "#012590",
  },
  secondary: {
    lightest: "#FFE164",
    light: "#FFD939",
    main: "#FFCE00",
    dark: "#C6A000",
    darkest: "#9B7D00",
  },
  blend: [
    "#0040ff",
    "#124aec",
    "#2455da",
    "#3660c8",
    "#486bb6",
    "#5b75a3",
    "#6d8091",
    "#7f8b7f",
    "#91966d",
    "#a3a15b",
    "#b6ab48",
    "#c8b636",
    "#dac124",
    "#eccc12",
    "#ffd700",
  ],
  gray: "#536878",
  background: "#e4e4ff",
};

export const Button = styled.button<any>((props) => ({
  backgroundColor: props.secondary
    ? colors.secondary.main
    : colors.primary.main,
  width: "150px",
  height: "50px",
  borderRadius: "0.75rem",
  border: "none",
  cursor: "pointer",
  color: props.secondary ? colors.primary.main : colors.background,
  "&:hover": {
    backgroundColor: props.secondary
      ? colors.secondary.lightest
      : colors.primary.lightest,
    transition: "all 0.5s",
  },
  font: "inherit",
  fontWeight: 400,
}));
