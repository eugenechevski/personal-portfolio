const sizeClasses = {
  sm: "w-16 p-2 text-sm",
  md: "w-32 p-4 text-md",
  lg: "w-64 p-8 text-lg",
};

export default function Button({
  textContent,
  size,
  hanlderOnClick,
  type,
  disabled
}: {
  textContent: string;
  size?: "sm" | "md" | "lg";
  hanlderOnClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={hanlderOnClick}
      className={
        "bg-white rounded-3xl shadow-2xl drop-shadow-2xl text-[#6B21A5] mb-12 hover:opacity-[35%] " +
        sizeClasses[size || "md"]
      }
      type={type || "button"}
      disabled={disabled}
    >
      {textContent}
    </button>
  );
}
