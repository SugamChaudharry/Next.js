import { FeaturedCourses, HeroSection, WhyChooseUs } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
    </main>
  );
}
