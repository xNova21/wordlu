import ToggleDarkMode from "./components/ToggleDarkMode";
import Instructions from "./components/Instructions";

export default function Layout({ children }) {

  return (
    <>
      <header className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2">
        <nav className="flex px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200 justify-center items-center">
          <Instructions />
          <ToggleDarkMode />
        </nav>
      </header>
      <main className="px-4 flex align-center max-h-screen">{children}</main>
    </>
  );
}
