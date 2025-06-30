export function ActionpackdFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent backdrop-blur-sm py-3">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <a
          href="https://actionpackd.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 opacity-75 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm font-light tracking-wide">Made by</span>
          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Actionpackd
          </span>
        </a>
      </div>
    </footer>
  );
}
