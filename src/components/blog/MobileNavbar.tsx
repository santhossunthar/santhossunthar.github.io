'use client'

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface MobileNavbarProps {
  breadcrumb: BreadcrumbItem[];
  onMenuClick: () => void;
  currentPage?: number;
  totalPages?: number;
  currentView?: 'posts' | 'tags';
}

export default function MobileNavbar({ breadcrumb, onMenuClick, currentPage, totalPages, currentView }: MobileNavbarProps) {
  // Get the current page title based on view
  const getPageTitle = () => {
    if (currentView === 'tags') {
      return 'Tags';
    }
    if (breadcrumb.length > 1) {
      return breadcrumb[breadcrumb.length - 1].label;
    }
    return 'Blog Posts';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/20">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title */}
        <div className="flex-1 mx-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-2 text-white font-cyber text-sm whitespace-nowrap">
              {breadcrumb.length > 1 ? (
                <div className="flex items-center">
                  {/* Previous page clickable icon */}
                  <button
                    onClick={() => {
                      const previousItem = breadcrumb[breadcrumb.length - 2];
                      if (previousItem?.path) {
                        window.location.assign(previousItem.path);
                      } else {
                        window.history.back();
                      }
                    }}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-300 mr-2 flex-shrink-0"
                    aria-label="Go back to previous page"
                  >
                    <svg
                      className="w-4 h-4 text-white/60 hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {/* Current page title only */}
                  <span className="font-semibold">
                    {getPageTitle()}
                  </span>
                </div>
              ) : (
                <span className="font-semibold">{getPageTitle()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Pagination Info */}
        {currentPage && totalPages && currentView === 'posts' && (
          <div className="text-white/60 text-xs font-cyber">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </div>
  );
}
