export const Snowflakes = () => {
  return (
    <div>
      {/* Snow effect */}
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: "white",
            borderRadius: "50%",
            opacity: Math.random(),
            animation: `fall ${3 + Math.random() * 3}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0) }
            100% { transform: translateY(220px) }
          }
        `}
      </style>
    </div>
  );
};
