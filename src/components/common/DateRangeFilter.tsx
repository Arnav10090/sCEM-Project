import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parse } from 'date-fns';

interface DateRangeFilterProps {
  label: string;
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  label,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const handleFromDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateStr = format(date, 'yyyy-MM-dd');
      onFromDateChange(dateStr);
      setFromOpen(false);
    }
  };

  const handleToDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateStr = format(date, 'yyyy-MM-dd');
      onToDateChange(dateStr);
      setToOpen(false);
    }
  };

  const getDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Pick a date';
    try {
      const date = parse(dateStr, 'yyyy-MM-dd', new Date());
      return format(date, 'MMM dd, yyyy');
    } catch {
      return dateStr;
    }
  };

  const fromDate_ = fromDate ? parse(fromDate, 'yyyy-MM-dd', new Date()) : undefined;
  const toDate_ = toDate ? parse(toDate, 'yyyy-MM-dd', new Date()) : undefined;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-muted-foreground whitespace-nowrap">{label}</label>
      
      <Popover open={fromOpen} onOpenChange={setFromOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-9 gap-2 w-auto"
          >
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{getDisplayDate(fromDate)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={fromDate_}
            onSelect={handleFromDateSelect}
            disabled={(date) => toDate_ ? date > toDate_ : false}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <span className="text-xs text-muted-foreground">to</span>

      <Popover open={toOpen} onOpenChange={setToOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-9 gap-2 w-auto"
          >
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{getDisplayDate(toDate)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={toDate_}
            onSelect={handleToDateSelect}
            disabled={(date) => fromDate_ ? date < fromDate_ : false}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {(fromDate || toDate) && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          onClick={() => {
            onFromDateChange('');
            onToDateChange('');
          }}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
