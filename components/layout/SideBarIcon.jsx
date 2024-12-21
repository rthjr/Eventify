export function SideBarIConText({ text, icon, onClick, isActive }) {
    return (
      <button
        className={`relative flex flex-row gap-x-2 mb-5 hover:text-blue-400 ${
          isActive ? "text-blue-500 font-bold" : "text-black"
        }`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    );
  }