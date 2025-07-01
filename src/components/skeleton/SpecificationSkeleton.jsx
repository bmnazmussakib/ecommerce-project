import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SpecificationSkeleton() {
  return (
    <div className="card bg-base-100 card-md shadow-sm w-3/4">
      <div className="card-body">
        <Skeleton width={120} height={24} className="mb-3" />
        <Skeleton width={200} height={20} className="mb-3" />
        <ul className="list-disc list-inside space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li key={idx}>
              <Skeleton width={180 + idx * 10} height={14} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
