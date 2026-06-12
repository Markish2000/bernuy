export interface BuildMetadataArgs {
  readonly description: string;
  readonly locale: string;
  readonly path: string; // ej: '' (home) | '/fragancias/b'
  readonly title: string;
}
