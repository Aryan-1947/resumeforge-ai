function Logo({ size = 16, darkBg = true }) {
  const sparkColor = darkBg ? "#FFFFFF" : "#1A1A1A";
  const lineColor = "#1A1A1A";
  const glowOpacity = darkBg ? "0.22" : "0.18";

  return (
    <svg
      width={size}
      height={size}
      viewBox="-70 -75 140 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Amber glow oval */}
      <ellipse
  cx="0"
  cy="0"
  rx="62"
  ry="68"
  fill="#F59E0B"
  opacity={glowOpacity}
/>
      {/* Document body */}
      <path d="M-32,-46 L20,-46 L38,-26 L38,46 L-32,46 Z" fill="#F59E0B"/>
      {/* Folded corner */}
      <path d="M20,-46 L20,-26 L38,-26 Z" fill="#92400E"/>
      {/* Resume lines */}
      <rect x="-18" y="-14" width="32" height="4.5" rx="2.2" fill={lineColor} opacity="0.85"/>
      <rect x="-18" y="0" width="40" height="4.5" rx="2.2" fill={lineColor} opacity="0.85"/>
      <rect x="-18" y="14" width="24" height="4.5" rx="2.2" fill={lineColor} opacity="0.85"/>
      <rect x="-18" y="28" width="18" height="4.5" rx="2.2" fill={lineColor} opacity="0.5"/>
      {/* Lightning bolt */}
      <path
        d="M16,-50 L6,-28 L18,-28 L6,-6"
        stroke={sparkColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Spark particles */}
      <circle cx="26" cy="-42" r="3" fill={sparkColor} opacity="0.9"/>
      <circle cx="34" cy="-54" r="2" fill={sparkColor} opacity="0.65"/>
      <circle cx="20" cy="-58" r="1.5" fill={sparkColor} opacity="0.45"/>
    </svg>
  );
}

export default Logo;