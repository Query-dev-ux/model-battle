export interface Model {
  id: string;
  username: string;
  display_name: string;
  gender: string;
  members_count: number;
  is_online: boolean;
  profile_images: {
    thumbnail_image_big: string;
  };
  display_age?: string;
} 