import React from "react";

interface IconProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  style?: React.CSSProperties;
}

// FontAwesome 6 Icons
export const FaCreditCard: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 576 512" fill={fill} className={className} style={style} {...props}>
    <path d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" />
  </svg>
);

export const FaLock: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor", style, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill={fill} className={className} style={style} {...props}>
    <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
  </svg>
);

export const FaArrowTrendUp: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 576 512" fill={fill} className={className} style={style} {...props}>
    <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z" />
  </svg>
);

export const FaRegClock: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill={fill} className={className} style={style} {...props}>
    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
  </svg>
);

export const FaDollarSign: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 320 512" fill={fill} className={className} style={style} {...props}>
    <path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z" />
  </svg>
);

export const FaMedal: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor", style, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill={fill} className={className} style={style} {...props}>
    <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
  </svg>
);

export const FaQuestion: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 320 512" fill={fill} className={className} style={style} {...props}>
    <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
  </svg>
);

// BoxIcons Icons
export const BiSolidZap: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} style={style} {...props}>
    <path d="M20.98 11.802a.995.995 0 0 0-.738-.771l-6.86-1.716 2.537-5.921a.998.998 0 0 0-.317-1.192.996.996 0 0 0-1.234.024l-11 9a1 1 0 0 0 .39 1.744l6.719 1.681-3.345 5.854A1.001 1.001 0 0 0 8 22a.995.995 0 0 0 .6-.2l12-9a1 1 0 0 0 .38-.998z" />
  </svg>
);

// Material Design Icons
export const MdRocketLaunch: React.FC<IconProps> = ({
  size = 24,
  className = "",
  fill = "currentColor",
  style,
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} style={style} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.05-4.05c.47-.47.68-1.15.55-1.81l-.26-1.33zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12A2.996 2.996 0 0 1 9 18zm4-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
  </svg>
);

// Lucide Icons (stroke-based, 24x24 viewBox)
export const Share2: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.59 13.51 6.83 3.98" />
    <path d="m15.41 6.51-6.82 3.98" />
  </svg>
);

export const Target: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const DollarSign: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const TrendingUp: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
    <polyline points="16,7 22,7 22,13" />
  </svg>
);

export const Zap: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
);

// Additional commonly used Lucide icons
export const Check: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

export const Calendar: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

export const X: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const AlertCircle: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const CheckCircle: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

export const XCircle: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export const Clock: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

export const Copy: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// ALL remaining Lucide icons
export const ExternalLink: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const FileText: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

export const Star: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

export const User: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const AtSign: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

export const Phone: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const Laptop: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
  </svg>
);

export const Tag: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0L21 13a1 1 0 0 0 0-1.42L12 2z" />
    <circle cx="7" cy="7" r="1" />
  </svg>
);

export const Tablet: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

export const SmartphoneCharging: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12.667 8L10 12h4l-2.667 4" />
  </svg>
);

export const Instagram: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Loader2: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
);

export const Chrome: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

export const CircleCheck: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const CircleX: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export const CreditCard: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const Wallet: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

export const Youtube: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10,8 16,12 10,16" />
  </svg>
);

export const CalendarCheck: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

export const MailPlus: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
    <path d="m22 7-10 5L2 7" />
    <path d="m19 16 3 3" />
    <path d="m22 16-3 3" />
  </svg>
);

export const UserPlus: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

export const ArrowUpRight: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

export const Edit3: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export const ChevronRight: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

export const BookOpen: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const Users: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
  fill = "none",
  style,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6" />
    <path d="M23 11h-6" />
  </svg>
);
