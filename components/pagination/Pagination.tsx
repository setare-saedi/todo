interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPageNumbers = 7;
    const sidePages = 1;
    const middlePages = 3; 
    const endPages = 1;

    if (totalPages <= maxPageNumbers) {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      pages.push(...Array.from({ length: sidePages }, (_, i) => i + 1));

      if (currentPage > sidePages + middlePages) {
        pages.push('...');
      }

      const middlePageStart = Math.max(currentPage - 1, sidePages + 1);
      const middlePageEnd = Math.min(currentPage + 1, totalPages - endPages);

      pages.push(...Array.from({ length: middlePageEnd - middlePageStart + 1 }, (_, i) => middlePageStart + i));

      if (currentPage < totalPages - endPages - 1) {
        pages.push('...');
      }

      pages.push(...Array.from({ length: endPages }, (_, i) => totalPages - endPages + 1 + i));
    }

    return pages;
  };

  return (
    <div className='flex text-center justify-center items-center gap-3'>
      <button
        className={`rounded-md border px-2 ${currentPage === 1 ? 'bg-gray-100 border-gray-300' : 'bg-violet-100 border-violet-300'}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {renderPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`rounded-md border text-sm pt-1 px-2 ${currentPage === page ? 'bg-violet-200' : 'bg-violet-100 border-violet-300'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2">...</span>
        )
      )}

      <button
        className={`rounded-md border px-2 ${currentPage === totalPages ? 'bg-gray-100 border-gray-300' : 'bg-violet-100 border-violet-300'}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
}
