// --- file: types/ui/index.ts ---
export interface IconProps {
  className?: string;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export interface SkillBadgeProps {
  skill: string;
}

export interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    company: string;
    description: string;
  };
  index?: number; // Made optional since it's not currently used
}

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface MobileMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationItem[];
  currentPath: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}
