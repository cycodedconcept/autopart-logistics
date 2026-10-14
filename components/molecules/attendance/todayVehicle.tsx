interface VehicleType {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

interface TodayVehicleCardProps {
  totalEmployees?: number;
  checkedInToday?: string;
  vehicles?: VehicleType[];
  onMenuClick?: () => void;
}

const TodayVehicleCard: React.FC<TodayVehicleCardProps> = ({
  totalEmployees = 150,
  checkedInToday = 'Checked In Today',
  vehicles = [
    { name: 'Trucks', percentage: 47, count: 70, color: '#ef4444' },
    { name: 'Vans', percentage: 33, count: 50, color: '#22c55e' },
    { name: 'Pickup Cars', percentage: 20, count: 30, color: '#8b5cf6' },
  ],
  onMenuClick,
}) => {
  const totalPercentage = vehicles.reduce((sum, v) => sum + v.percentage, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-sm">
      {/* Header with title and menu */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Today Vehicle</h3>
        <button
          onClick={onMenuClick}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Menu"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Employee Count */}
      <div className="mb-2 flex items-baseline gap-2">
        <p className="text-4xl font-bold text-gray-900">
          {totalEmployees}
        </p>
        <p className="text-gray-600 text-sm">Employees</p>
      </div>

      <p className="text-gray-500 text-sm mb-6">{checkedInToday}</p>

      {/* Stacked Bar Chart */}
      <div className="mb-6">
        <div className="flex rounded-full overflow-hidden h-6 shadow-sm">
          {vehicles.map((vehicle, idx) => (
            <div
              key={idx}
              style={{
                width: `${vehicle.percentage}%`,
                backgroundColor: vehicle.color,
              }}
              className="transition-all duration-300"
              title={`${vehicle.name}: ${vehicle.percentage}%`}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {vehicles.map((vehicle, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: vehicle.color }}
              />
              <span className="text-gray-700 font-medium text-sm">
                {vehicle.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-gray-900 font-semibold text-sm">
                {vehicle.percentage}%
              </p>
              <p className="text-gray-500 text-xs">
                {vehicle.count} Employees
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayVehicleCard