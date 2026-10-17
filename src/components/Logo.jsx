export function Logo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="brand-logo"
    >
      <rect width="40" height="40" rx="9" fill="#0c3d38" />
      <path
        d="M11 27.5V15.2c0-1 .6-1.9 1.5-2.3L20 9.8l7.5 3.1c.9.4 1.5 1.3 1.5 2.3v12.3"
        stroke="#f7faf8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15.8 21.1l2.8 2.8 5.8-6"
        stroke="#7eb8a8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
