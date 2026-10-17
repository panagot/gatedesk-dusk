import { useId, useState } from "react";

export function Tip({ label, children, side = "top" }) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={`tip tip-${side}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button type="button" className="tip-trigger" aria-describedby={open ? id : undefined}>
        {children ?? "?"}
      </button>
      {open && (
        <span role="tooltip" id={id} className="tip-bubble">
          {label}
        </span>
      )}
    </span>
  );
}
