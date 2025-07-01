"use client";

export default function BreadCrumbsSkeleton() {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs text-sm bg-gray-100 px-4 py-3 rounded-md max-w-screen-2xl mx-auto">
      <ul className="flex space-x-2">
        {/* Home placeholder */}
        <li>
          <div className="h-4 w-10 rounded bg-gray-300 animate-pulse" />
        </li>
        {/* Separator */}
        <li>
          <div className="h-4 w-2 bg-transparent">/</div>
        </li>
        {/* Category placeholder */}
        <li>
          <div className="h-4 w-20 rounded bg-gray-300 animate-pulse" />
        </li>
        {/* Separator */}
        <li>
          <div className="h-4 w-2 bg-transparent">/</div>
        </li>
        {/* Product placeholder */}
        <li>
          <div className="h-4 w-32 rounded bg-gray-300 animate-pulse" />
        </li>
      </ul>
    </nav>
  );
}
