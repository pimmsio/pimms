import { Star } from "@/components/icons/custom-icons";
import { OptimizedImage } from "@/components/ui/optimized-image";
import React from "react";
import { getTranslations } from "next-intl/server";

interface TestimonialProps {
  children: React.ReactNode;
  name: string;
  role: string;
  profileImage: string;
  bannerImage: string;
  rating?: number;
}

export async function Testimonial({ children, name, role, profileImage, bannerImage, rating = 5 }: TestimonialProps) {
  const t = await getTranslations("landing.testimonial");
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < count ? "text-brand-primary fill-current" : "text-muted-foreground"}`}
      />
    ));
  };

  return (
    <div className="relative bg-card rounded-2xl overflow-hidden w-full">
      {/* Banner Image */}
      <div className="relative aspect-[4/1] overflow-hidden bg-muted/70">
        <OptimizedImage
          src={bannerImage}
          alt={t("banner_alt", { name })}
          width={800}
          height={200}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-5 pt-5 pb-3">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative -mt-10 flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted/60">
              <OptimizedImage
                src={profileImage}
                alt={t("profile_alt", { name })}
                width={88}
                height={88}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Name and Role */}
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground leading-tight">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{role}</p>
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="px-5 pb-5">
        <div className="text-foreground leading-relaxed mb-4 text-base [&>p]:text-base [&>p]:leading-relaxed [&>p]:m-0 line-clamp-6">
          {children}
        </div>

        {/* Rating */}
        <div className="flex gap-1">{renderStars(rating)}</div>
      </div>
    </div>
  );
}
