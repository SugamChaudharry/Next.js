import {
  FeaturedCourses,
  HeroSection,
  WhyChooseUs,
  TestimonialCards,
  UpcomingWebinars,
  Instructors,
  Footer,
  Navbar
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] ">
      <div className="relative w-full flex items-center justify-center " >
          <Navbar />
      </div>
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <TestimonialCards />
      <UpcomingWebinars />
      <Instructors />
      <Footer />
    </main>
  );
}
