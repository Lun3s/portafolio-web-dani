import { Instagram, TikTok, Linkedin } from "../components/common/Icons";
import type { SocialLink } from "../types";

export const socials: SocialLink[] = [
  { label: "Instagram", url: "https://www.instagram.com/mymokastudio", icon: <Instagram /> },
  { label: "TikTok", url: "https://www.tiktok.com/@mymokastudio", icon: <TikTok /> },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/daniela-gonzales-comunicaciones", icon: <Linkedin /> },
];

export default socials;
