export default function Dropdown() {
  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn px-10 py-0 bg-transparent text-black hover:bg-transparent self-start border-blue-500 ">
        filter
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] w-52 p-2 bg-white text-blue-500 border-black border-0 "
      >
        <li>
          <a>ascending</a>
        </li>
        <li>
          <a>descending</a>
        </li>
      </ul>
    </div>
  );
}
