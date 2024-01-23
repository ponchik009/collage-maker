export type Collage = {
  id: string;
  name: string;
  images: CollageImage[];
};

export type CollageImage = {
  id: string;
  position: number;
  x: number;
  y: number;
  src: string;
  collage: Collage;
};
