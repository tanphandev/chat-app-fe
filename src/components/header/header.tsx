import Logo from "../logo/logo";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[64px] shadow-sm border-b px-4 py-2 z-50 bg-white">
      <div className="h-full flex items-center">
        <Logo width={40} height={40} />
      </div>
    </div>
  );
}

export default Header;
