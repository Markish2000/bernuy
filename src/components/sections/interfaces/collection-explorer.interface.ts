import type { ReactNode } from 'react';

export type CollectionFilterValue = 'all' | 'men' | 'women';

export interface CollectionFilterLabels {
  readonly all: string;
  readonly men: string;
  readonly women: string;
}

export interface CollectionFilterProps {
  readonly value: CollectionFilterValue;
  readonly labels: CollectionFilterLabels;
  readonly onChange: (value: CollectionFilterValue) => void;
}

export interface CollectionExplorerProps {
  readonly labels: CollectionFilterLabels;
  readonly men: ReactNode;
  readonly women: ReactNode;
}
