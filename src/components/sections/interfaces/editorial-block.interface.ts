export interface EditorialBlockImage {
  readonly alt: string;
  readonly height: number;
  readonly src: string;
  readonly width: number;
}

export interface EditorialBlockProps {
  readonly bodyKey: string;
  readonly image: EditorialBlockImage;
  readonly index: number;
  readonly reverse?: boolean;
  readonly titleKey: string;
}
