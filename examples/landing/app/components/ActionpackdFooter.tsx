export function ActionpackdFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Made by</span>
          <a
            href="https://actionpackd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Actionpackd
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/ActionpackdHQ/Ignite-AI-SDK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
