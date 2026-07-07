'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Button from '../atoms/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationTab({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Main Logic: Generates dynamic page array (e.g., [1, '...', 4, 5, 6, '...', 10])
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblings = 1; // Number of pages to show on each side of the active page

    // 1. If total pages are small, show all pages without ellipsis
    if (totalPages <= 5 + siblings * 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // 2. Determine if ellipses are needed on either side
    const showLeftEllipsis = currentPage > 3 + siblings;
    const showRightEllipsis = currentPage < totalPages - (2 + siblings);

    // Case A: Ellipsis only on the right (user is near the start)
    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRangeCount = 3 + 2 * siblings;
      for (let i = 1; i <= leftRangeCount; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } 
    // Case B: Ellipsis only on the left (user is near the end)
    else if (showLeftEllipsis && !showRightEllipsis) {
      const rightRangeCount = 3 + 2 * siblings;
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - rightRangeCount + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    // Case C: Ellipsis on both sides (user is in the middle)
    else if (showLeftEllipsis && showRightEllipsis) {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - siblings; i <= currentPage + siblings; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null; // Hide pagination if there is only 1 page

  return (
    <div className="flex items-center justify-center gap-1.5 md:gap-2 my-4">
      {/* Previous Button */}
      <Button
        className="px-3 py-1.5 text-sm font-medium border rounded bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </Button>

      {/* Dynamic Page Buttons & Ellipses */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-1.5 text-gray-400 select-none">
              ...
            </span>
          );
        }

        return (
          <Button
            key={`page-${page}`}
            onClick={() => handlePageChange(page as number)}
            className={`px-3 py-1.5 text-sm font-medium border rounded transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white hover:bg-gray-50 border-gray-200'
            }`}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        className="px-3 py-1.5 text-sm font-medium border rounded bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
