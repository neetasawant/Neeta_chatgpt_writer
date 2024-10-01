const Button: React.FC<{
  onClick: () => void;
  icon: string;
  label: string;
  primary?: boolean;
}> = ({ onClick, icon, label, primary }) => (
  <button
    onClick={onClick}
    className={`mt-2 p-6 rounded-[6px] flex items-center h-[30px] font-semibold ${
      primary
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "border-solid border-gray-500 bg-white hover:bg-gray-100 text-gray-500"
    }`}
  >
    <img
      src={icon}
      alt={label}
      className="w-6 h-6 mr-4 mt-0.5 justify-center items-center"
    />
    <span>{label}</span>
  </button>
);

export default Button;
