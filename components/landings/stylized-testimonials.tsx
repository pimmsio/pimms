import { getTranslations } from "next-intl/server";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Star } from "@/components/icons/custom-icons";

interface StylizedTestimonialsProps {
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  profileImage: string;
  bannerImage: string;
  rating: number;
}

export default async function StylizedTestimonials({
  className = "",
  locale
}: StylizedTestimonialsProps & { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.testimonials" });

  const testimonials: Testimonial[] = [
    {
      id: "mathieu-visiere",
      name: t("testimonial1.name"),
      role: t("testimonial1.role"),
      text: t("testimonial1.text"),
      profileImage: "https://assets.pimms.io/mathieu-visiere.jpeg",
      bannerImage: "https://assets.pimms.io/linkedin-banner-1.webp",
      rating: 5
    },
    {
      id: "ronan-jaffre",
      name: t("testimonial2.name"),
      role: t("testimonial2.role"),
      text: t("testimonial2.text"),
      profileImage: "https://assets.pimms.io/ronan-jaffre.jpeg",
      bannerImage: "https://assets.pimms.io/linkedin-banner-2.webp",
      rating: 5
    },
    {
      id: "jean-castets",
      name: t("testimonial3.name"),
      role: t("testimonial3.role"),
      text: t("testimonial3.text"),
      profileImage: "https://assets.pimms.io/jean-castets.jpeg",
      bannerImage: "https://assets.pimms.io/linkedin-banner-3.webp",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));
  };

  return (
    <div className={`py-16 ${className}`}>
      <BlurFade direction="up" inView>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t("title")}</h2>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <BlurFade key={testimonial.id} direction="up" delay={0.1 * (index + 1)} inView>
            <div className="group relative bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300">
              {/* Banner Image */}
              <div className="relative h-28 overflow-hidden">
                <img
                  src={testimonial.bannerImage}
                  alt={`Bannière LinkedIn de ${testimonial.name}`}
                  width="400"
                  height="112"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Profile Section */}
              <div className="relative px-6 pt-6 pb-4">
                <div className="flex items-start gap-4">
                  {/* Profile Image */}
                  <div className="relative -mt-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white">
                      <img
                        src={testimonial.profileImage}
                        alt={`Photo de profil de ${testimonial.name}`}
                        width="56"
                        height="56"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Name and Role */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">{testimonial.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="px-6 pb-6">
                <p className="text-gray-800 leading-relaxed mb-4 text-sm font-medium">{testimonial.text}</p>

                {/* Rating */}
                <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
