import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/0 border border-[rgba(232,213,196,0.2)] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-[rgba(232,213,196,0.3)] rounded-full w-14 h-14 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-[#D4745F] stroke-[2]" />
      </div>
      
      <h3 className="text-[#1a4d6f] mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}
