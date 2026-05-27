export type Category = {
  slug: string;
  label: string;
};

export type Look = {
  id: string;
  title: string;
  tagline: string;
  categorySlug: string;
  // Hidden from the UI; drives generation later.
  prompt: string;
  beforeImage: string;
  afterImage: string;
};
