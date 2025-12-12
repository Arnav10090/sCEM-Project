export type PageName = 
  | 'Main Dashboard'
  | 'Equipment Verification'
  | 'Parameter Monitoring'
  | 'Equipment Configuration'
  | 'Planning & Reports'
  | 'Alarms'
  | 'System Architecture'
  | 'Spare Tab';

interface NavigationProps {
  currentPage: PageName;
  setCurrentPage: (page: PageName) => void;
}

const navItems: PageName[] = [
  'Main Dashboard',
  'Equipment Verification',
  'Parameter Monitoring',
  'Equipment Configuration',
  'Planning & Reports',
  'Alarms',
  'System Architecture',
  'Spare Tab',
];

const Navigation = ({ currentPage, setCurrentPage }: NavigationProps) => {
  return (
    <nav className="bg-card border-b border-border px-4 overflow-x-auto">
      <div className="flex gap-1 justify-evenly w-full">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setCurrentPage(item)}
            className={`nav-tab whitespace-nowrap flex-1 ${
              currentPage === item ? 'nav-tab-active' : 'nav-tab-inactive'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
