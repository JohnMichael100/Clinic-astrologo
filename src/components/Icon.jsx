// Small set of line icons drawn as inline SVG (no emojis, no icon library).
// Each entry is a single SVG path in a 24x24 grid.
const paths = {
  plus: "M12 5v14M5 12h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l5 5L20 7",
  chevron: "M6 9l6 6 6-6",
  heart: "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1M20 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  child: "M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 21v-2a6 6 0 0 1 12 0v2",
  drop: "M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z",
  tooth: "M7 3C5 3 3.5 5 3.5 7.5c0 3 1.5 4 1.5 8 0 2.5.5 5.5 2 5.5s1.5-4 3-4 1.5 4 3 4 2-3 2-5.5c0-4 1.5-5 1.5-8C16.5 5 15 3 13 3c-1.5 0-2 .8-3 .8S8.5 3 7 3z",
  flask: "M9 3h6M10 3v6L5 19a1 1 0 0 0 1 1.5h12a1 1 0 0 0 1-1.5L14 9V3",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  pin: "M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  award: "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8.5 12.5L7 21l5-3 5 3-1.5-8.5",
  users: "M9 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3 20v-1a6 6 0 0 1 12 0v1M17 5a3 3 0 0 1 0 5.5M18 14a5 5 0 0 1 3 5v1",
};

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
