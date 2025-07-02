import { HeartHandshake } from 'lucide-react';
import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <HeartHandshake className="h-10 w-10 text-primary" />
      <h1 className="text-3xl font-bold font-headline text-slate-800 dark:text-slate-200">
        Match Friends
      </h1>
    </div>
  );
}
