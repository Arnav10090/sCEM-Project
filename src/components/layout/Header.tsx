import { useEffect, useState } from 'react';

interface HeaderProps {
  currentPage: string;
}

const Header = ({ currentPage }: HeaderProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <header className="h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-4 gap-3">
      {/* Customer Logo */}
      <div className="w-40 h-12 border border-gray-400 rounded flex items-center justify-center bg-white flex-shrink-0">
        <span className="text-sm text-gray-600 font-medium">Customer Name/Logo</span>
      </div>

      {/* System Title */}
      <div className="flex-1 text-center min-w-0">
        <h1 className="text-gray-800 font-bold text-lg tracking-wide truncate">
          Smart Critical Equipment Monitoring System (sCEM) - {currentPage}
        </h1>
      </div>

      {/* Date/Time and Hitachi Logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Date: </span>
          <span className="font-mono">{formatDateTime(currentDateTime)}</span>
        </div>
        <div className="w-28 h-12 border border-gray-400 rounded flex items-center justify-center bg-white flex-shrink-0">
          <span className="text-gray-800 font-semibold text-xs">HITACHI</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
