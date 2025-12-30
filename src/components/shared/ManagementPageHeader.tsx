"use client";


import { Plus, type LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface ManagementPageHeaderPorops {
  title: string;
  description: string;
  actions?: {
    icon?: LucideIcon;
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

const ManagementPageHeader = ({
  title,
  description,
  actions,
  children,
}: ManagementPageHeaderPorops) => {
  const Icon = actions?.icon || Plus;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <Button onClick={actions.onClick}>
          <Icon className="mr-2 h-4 w-4" />
          {actions.label}
        </Button>
      )}
      {children}
    </div>
  );
};

export default ManagementPageHeader;
