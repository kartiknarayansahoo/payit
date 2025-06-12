import { type JSX } from "react";
import { OnRampStatus } from "@prisma/client";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}


export const TransactionsSubCard = ({ onRampStatus, text, amount, date }: { onRampStatus: OnRampStatus, text: string, amount: string, date: string }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <div className="pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div className="pl-2">
          <div className="flex">
            <div className="font-semibold pr-2">
              {text}
            </div>
            <div className={`px-2 font-medium rounded-xl ${onRampStatus === 'Success' ? 'bg-green-200 text-green-700' :
              onRampStatus === 'Failure' ? 'bg-red-200 text-red-700' :
                onRampStatus === 'Pending' ? 'bg-yellow-200 text-yellow-700' :
                  'bg-gray-200'
              }`}>
              {onRampStatus}
            </div>
          </div>
          <div className="text-stone-500">
            {date}
          </div>
        </div>
      </div>

      <div className="pr-2 font-semibold">
        {amount}
      </div>
    </div>
  )
}

