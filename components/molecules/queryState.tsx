import { Loader2, RefreshCw } from "lucide-react";

interface QueryStateProps {
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
  children: React.ReactNode;
}

// Shows a spinner while loading and the API's message with a retry on error
const QueryState: React.FC<QueryStateProps> = ({ isLoading, error, onRetry, children }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-agray">
        <Loader2 size={18} className="animate-spin" /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-ared">{error.message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1.5 rounded-lg border border-agray-border px-3 py-1.5 text-sm font-medium text-dark-gray hover:bg-background"
          >
            <RefreshCw size={14} /> Try again
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default QueryState;
