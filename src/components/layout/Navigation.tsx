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
    <nav className="bg-blue-50 border-b border-gray-300 px-6 py-3 overflow-x-auto">
      <div className="flex items-center gap-6 w-full">
        {/* Admin Dashboard Badge */}
        <div className="flex-shrink-0">
          <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold">
            Admin Dashboard
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex gap-6 flex-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`nav-tab whitespace-nowrap ${
                currentPage === item ? 'nav-tab-active' : 'nav-tab-inactive'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
