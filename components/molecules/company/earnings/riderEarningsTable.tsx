import Link from "next/link";
import Avatar from "@/components/atoms/avatar";
import { formatNaira } from "@/lib/format";
import { RiderEarning } from "@/types/company";

const RiderEarningsTable: React.FC<{ riders: RiderEarning[] }> = ({ riders }) => {
  const total = riders.reduce((sum, r) => sum + r.gross, 0);

  return (
    <div className="rounded-xl border border-alight-gray-border bg-white p-4">
      <h3 className="text-sm font-semibold text-dark-gray">Rider Earnings Breakdown</h3>
      <p className="text-xs text-agray">Each rider&apos;s delivery fees and share of revenue</p>

      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full min-w-150 text-left text-sm">
          <thead>
            <tr className="border-b border-alight-gray-border text-xs text-agray">
              <th className="py-2 font-medium">Rider</th>
              <th className="py-2 font-medium">Jobs</th>
              <th className="py-2 font-medium">Delivery Fees</th>
              <th className="py-2 font-medium">Your Share</th>
              <th className="py-2 font-medium w-1/4">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {riders.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-agray">
                  No earnings yet.
                </td>
              </tr>
            )}
            {riders.map((rider) => {
              const share = total ? Math.round((rider.gross / total) * 100) : 0;
              return (
                <tr key={rider.riderId} className="border-b border-alight-gray-border last:border-0">
                  <td className="py-3">
                    <Link
                      href={`/company/riders/${rider.riderId}`}
                      className="flex items-center gap-2.5 font-medium text-dark-gray hover:underline"
                    >
                      <Avatar name={rider.name} size="sm" />
                      {rider.name}
                    </Link>
                  </td>
                  <td className="py-3 text-light-gray">{rider.jobs}</td>
                  <td className="py-3 text-light-gray">{formatNaira(rider.gross)}</td>
                  <td className="py-3 font-medium text-aorange">{formatNaira(rider.net)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 flex-1 rounded-full bg-alight-gray-border"
                        role="progressbar"
                        aria-valuenow={share}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${rider.name} share of revenue`}
                      >
                        <div
                          className="h-full rounded-full bg-aorange"
                          style={{ width: `${share}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-xs text-light-gray">{share}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderEarningsTable;
