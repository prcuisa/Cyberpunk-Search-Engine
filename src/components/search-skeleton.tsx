'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function SearchSkeleton() {
  return (
    <div className="w-full max-w-4xl space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 cyber-border bg-card/30 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-6 w-3/4 bg-neon-cyan/20" />
              <Skeleton className="h-4 w-12 bg-neon-pink/20" />
            </div>
            <Skeleton className="h-4 w-full bg-muted/20" />
            <Skeleton className="h-4 w-5/6 bg-muted/20" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32 bg-neon-green/20" />
              <Skeleton className="h-4 w-20 bg-muted/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}