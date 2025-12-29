import type { LucideIcon } from "lucide-react";
import * as Icons   from "lucide-react";

export const getIconComponent = (iconName: string):LucideIcon => {
   
    const iconComponent = Icons[iconName as keyof typeof Icons];
    if (!iconComponent) {
     return Icons.HelpCircle
    }
  
    return iconComponent as LucideIcon;
};