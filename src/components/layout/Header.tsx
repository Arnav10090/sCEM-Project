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
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Customer Logo */}
      <div className="w-44 h-12 border border-border rounded flex items-center justify-center bg-card">
        <span className="text-xs text-muted-foreground font-medium">Customer Name/Logo</span>
      </div>

      {/* System Title */}
      <div className="flex-1 text-center">
        <h1 className="text-industrial-red font-bold text-lg tracking-wide">
          Smart Critical Equipment Monitoring System (sCEM) - {currentPage}
        </h1>
      </div>

      {/* Date/Time and Hitachi Logo */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-foreground">
          <span className="font-medium">Date: </span>
          <span className="font-mono">{formatDateTime(currentDateTime)}</span>
        </div>
        <div className="w-32 h-12 border border-border rounded flex items-center justify-center bg-card">
          <span className="text-xs text-muted-foreground font-medium">Hitachi Logo</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
