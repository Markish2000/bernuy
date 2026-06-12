import type { NoteTier } from '@/types/product';

export interface NoteCardProps {
  readonly alt: string;
  readonly image: string;
  readonly items: string;
  readonly tierLabel: string;
  readonly tier: NoteTier;
}
