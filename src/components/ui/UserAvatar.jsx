/* eslint-disable @next/next/no-img-element */
import { PiCrownSimpleFill } from "react-icons/pi";

export default function UserAvatar({ user, size = "h-10 w-10", className = "" }) {
  const initials = (user?.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const face = user?.image ? (
    <img src={user.image} alt={user.name || "User"} className={`${size} shrink-0 rounded-full object-cover ${className}`} />
  ) : (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-content ${className}`}>
      {initials}
    </span>
  );

  return (
    <span className="relative inline-flex shrink-0">
      {face}
      {user?.plan === "pro" && (
        <span
          title="Pro member"
          className="absolute -bottom-1 -right-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-accent text-accent-content ring-2 ring-base-100"
        >
          <PiCrownSimpleFill size={10} />
        </span>
      )}
    </span>
  );
}