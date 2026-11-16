import Avatar from "@/components/atoms/avatar";
import { ActivityItem } from "@/types/company";

const LiveActivity: React.FC<{ items: ActivityItem[] }> = ({ items }) => {
  return (
    <aside className="rounded-xl border border-alight-gray-border bg-white p-4 xl:rounded-none xl:border-0 xl:border-l xl:min-h-full">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-light-green opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-light-green" />
        </span>
        <h3 className="text-sm font-semibold text-dark-gray">Live Activity</h3>
      </div>
      <p className="text-xs text-agray">Real-time rider updates</p>

      {items.length === 0 && (
        <p className="py-10 text-center text-sm text-agray">No delivery activity yet.</p>
      )}
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-3 py-3 border-b border-alight-gray-border last:border-0"
          >
            <Avatar name={item.rider} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-dark-gray truncate">{item.rider}</p>
                <span className="shrink-0 text-[11px] text-agray">{item.time}</span>
              </div>
              <p className="text-xs text-light-gray">{item.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LiveActivity;
