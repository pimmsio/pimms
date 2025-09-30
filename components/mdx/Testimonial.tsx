import { Star } from "@/components/icons/custom-icons";
import { OptimizedImage } from "@/components/ui/optimized-image";
import React from "react";

interface TestimonialProps {
  children: React.ReactNode;
  name: string;
  role: string;
  profileImage: string;
  bannerImage: string;
  rating?: number;
}

export function Testimonial({ children, name, role, profileImage, bannerImage, rating = 5 }: TestimonialProps) {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < count ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));
  };

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 w-full">
      {/* Banner Image */}
      <div className="relative aspect-[4/1] overflow-hidden bg-gray-100">
        <OptimizedImage
          src={bannerImage}
          alt={`Bannière LinkedIn de ${name}`}
          width={800}
          height={200}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pt-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative -mt-10 flex-shrink-0">
            <div className="w-22 h-22 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white">
              <OptimizedImage
                src={profileImage}
                alt={`Photo de profil de ${name}`}
                width={88}
                height={88}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Name and Role */}
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 leading-tight">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">{role}</p>
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="px-6 pb-6">
        <div className="text-gray-800 leading-relaxed mb-4 text-base [&>p]:text-base [&>p]:leading-relaxed [&>p]:m-0">
          {children}
        </div>

        {/* Rating */}
        <div className="flex gap-1">{renderStars(rating)}</div>
      </div>
    </div>
  );
}
