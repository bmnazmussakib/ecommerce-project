import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductInfoSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton width={250} height={24} />
      <Skeleton width={180} height={20} />
      <Skeleton width={100} height={20} />
      <Skeleton width={150} height={24} />
      <Skeleton count={3} height={16} width={200} />
      <Skeleton height={40} width={200} />
    </div>
  );
}
