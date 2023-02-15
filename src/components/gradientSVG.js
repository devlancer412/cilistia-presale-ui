function GradientSVG() {
  const idCSS = "hello";
  const gradientTransform = `rotate(90)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="16.29%" stopColor="#ffa6e7" />
          <stop offset="85.56%" stopColor="#f43fc4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVG;
