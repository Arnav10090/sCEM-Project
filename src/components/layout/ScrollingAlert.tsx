const ScrollingAlert = () => {
  return (
    <div className="h-10 bg-industrial-cyan overflow-hidden flex items-center">
      <div className="scrolling-alert whitespace-nowrap">
        <span className="text-industrial-red italic font-medium text-sm">
          ⚠️ Scrolling Display for Important alerts, messages etc. | 
          Critical: Motor #3 temperature exceeding threshold | 
          Warning: Scheduled maintenance for Pump #7 tomorrow | 
          Info: System update completed successfully | 
          Alert: Vibration levels abnormal on Bearing DS-01 ⚠️
        </span>
      </div>
    </div>
  );
};

export default ScrollingAlert;
