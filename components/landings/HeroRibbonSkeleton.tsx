export function HeroRibbonSkeleton() {
  // Use the same dimensions as the real ribbon
  const width = 1000;
  const height = 420;
  const centerX = width / 2;
  const centerY = 210;
  const THICKNESS_ENDS = 420;
  const THICKNESS_CENTER = 200;
  const c1x = width * 0.33;
  const c2x = width * 0.66;
  const BLUE_BAR_WIDTH = 8;
  const BLUE_BAR_EXTRA = 90;
  const P_LOGO_RADIUS = 24;
  const P_LOGO_GAP = 10;

  // Generate ribbon geometry (same as API)
  const topYEnds = centerY - THICKNESS_ENDS / 2;
  const bottomYEnds = centerY + THICKNESS_ENDS / 2;
  const topYMid = centerY - THICKNESS_CENTER / 2;
  const bottomYMid = centerY + THICKNESS_CENTER / 2;

  const topPath = `M 0 ${topYEnds} C ${c1x} ${topYMid}, ${c2x} ${topYMid}, ${width} ${topYEnds}`;
  const ribbonPath = `${topPath} L ${width} ${bottomYEnds} C ${c2x} ${bottomYMid}, ${c1x} ${bottomYMid}, 0 ${bottomYEnds} Z`;

  // Create static skeleton avatars positioned along the ribbon
  const skeletonAvatars = Array.from({ length: 6 }).map((_, i) => {
    const progress = (i + 1) / 7; // Spread them across the ribbon
    const x = width * progress;

    // Calculate y position on the ribbon curve
    const laneOffset = 0.5 + (i % 2 === 0 ? -1 : 1) * 0.2; // Alternate lanes
    const y = topYEnds + (bottomYEnds - topYEnds) * laneOffset;

    return { x, y, id: i };
  });

  return (
    <div
      className="w-full grid place-items-center mb-28 sm:mb-12 mt-20 md:mt-6 md:mb-4"
      aria-hidden="true"
      data-nosnippet
      data-noindex="true"
    >
      <div className="relative w-full max-w-6xl scale-200 sm:scale-150 md:scale-125 xl:scale-100">
        <div className="w-full h-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="animate-pulse"
          >
            <defs>
              <filter id="skeleton-softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
              </filter>
              <linearGradient id="skeleton-ribbonFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f9fafb" />
                <stop offset="100%" stopColor="#f3f4f6" />
              </linearGradient>
              <linearGradient id="skeleton-blueBar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
              <clipPath id="skeleton-avatarClip">
                <circle r="36" cx="0" cy="0" />
              </clipPath>
            </defs>

            {/* Ribbon background */}
            <path d={ribbonPath} fill="url(#skeleton-ribbonFill)" />

            {/* Static skeleton avatars */}
            {skeletonAvatars.map((avatar) => (
              <g key={`skeleton-avatar-${avatar.id}`} transform={`translate(${avatar.x} ${avatar.y})`}>
                {/* Avatar circle */}
                <g clipPath="url(#skeleton-avatarClip)">
                  <circle cx="0" cy="0" r="36" fill="#e5e7eb" />
                  {/* Simple user icon placeholder */}
                  <g transform="translate(-16 -16)" opacity="0.5">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </g>
                </g>

                {/* Label skeleton */}
                {avatar.id % 4 !== 3 && ( // Don't show label on every avatar
                  <g transform="translate(0 44)">
                    <rect x="-60" y="0" width="120" height="36" rx="18" fill="#f3f4f6" stroke="#e5e7eb" />
                    {/* Icon placeholder */}
                    <rect x="-48" y="10" width="16" height="16" rx="2" fill="#d1d5db" />
                    {/* Text placeholder */}
                    <rect x="-26" y="12" width="60" height="12" rx="6" fill="#d1d5db" />
                  </g>
                )}
              </g>
            ))}

            {/* Blue bar */}
            <g filter="url(#skeleton-softShadow)">
              <rect
                x={centerX - BLUE_BAR_WIDTH / 2}
                y={centerY - (THICKNESS_CENTER + BLUE_BAR_EXTRA) / 2}
                width={BLUE_BAR_WIDTH}
                height={THICKNESS_CENTER + BLUE_BAR_EXTRA}
                rx={BLUE_BAR_WIDTH / 2}
                fill="url(#skeleton-blueBar)"
              />
            </g>

            {/* P logo skeleton */}
            <g
              transform={`translate(${centerX} ${centerY + (THICKNESS_CENTER + BLUE_BAR_EXTRA) / 2 + P_LOGO_GAP + P_LOGO_RADIUS})`}
            >
              <g filter="url(#skeleton-softShadow)">
                <circle r={P_LOGO_RADIUS} fill="url(#skeleton-blueBar)" />
              </g>
              {/* Simple P placeholder */}
              <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#9ca3af">
                P
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
