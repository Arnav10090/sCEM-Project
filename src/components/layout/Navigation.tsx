type PageName = 
  | 'Main Dashboard'
  | 'Equipment Verification'
  | 'Parameter Monitoring'
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
  'Planning & Reports',
  'Alarms',
  'System Architecture',
  'Spare Tab',
];

const Navigation = ({ currentPage, setCurrentPage }: NavigationProps) => {
  return (
    <nav className="bg-card border-b border-border px-4">
      <div className="flex gap-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setCurrentPage(item)}
            className={`nav-tab ${
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
