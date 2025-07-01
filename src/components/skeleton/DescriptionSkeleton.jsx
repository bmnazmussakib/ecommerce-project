import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DescriptionSkeleton() {
  return (
    <div className="card bg-base-100 card-md shadow-sm lg:w-3/4 w-full mb-5">
      <div className="card-body">
        <Skeleton width={150} height={24} className="mb-3" />
        <Skeleton count={4} height={12} className="mb-1" />
      </div>
    </div>
  );
}
