
import { Plus } from 'lucide-react';

interface EmployeeCardProps {
  totalEmployees?: number;
  maleCount?: number;
  malePercentage?: number;
  femaleCount?: number;
  femalePercentage?: number;
  onAddClick?: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  totalEmployees = 1350,
  maleCount = 830,
  malePercentage = 61,
  femaleCount = 520,
  femalePercentage = 39,
  onAddClick,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-sm">
      {/* Header with title and add button */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Employee</h3>
        <button
          onClick={onAddClick}
          className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center text-white transition-colors"
          aria-label="Add employee"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Total Employees */}
      <div className="mb-8">
        <p className="text-gray-600 text-sm mb-1">Total Employee</p>
        <p className="text-4xl font-bold text-gray-900">
          {totalEmployees.toLocaleString()}
        </p>
      </div>

      {/* Male Employees */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">
              {maleCount.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm">Male Employee</span>
          </div>
        </div>
        <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          {malePercentage}%
        </span>
      </div>

      {/* Female Employees */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">
              {femaleCount.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm">Female Employee</span>
          </div>
        </div>
        <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          {femalePercentage}%
        </span>
      </div>
    </div>
  );
};

export default EmployeeCard