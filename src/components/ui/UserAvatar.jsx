/* eslint-disable @next/next/no-img-element */
export default function UserAvatar({ user, size = "h-10 w-10", className = "" }) {
  const initials = (user?.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (user?.image) {
    return <img src={user.image} alt={user.name || "User"} className={`${size} shrink-0 rounded-full object-cover ${className}`} />;
  }
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-content ${className}`}>
      {initials}
    </span>
  );
}