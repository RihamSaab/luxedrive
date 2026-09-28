
import { Header } from "../components/Header";
import AdminBanner from "../components/AdminBanner";
import IntroSection from "../components/IntroSection";
import BookingSection from "../components/BookingSection";
import RentByBrands from "../components/RentByBrands";
import RentByType from "../components/RentByBodyType";
import CardList from "../components/CarList";
import HowItWorks from "../components/HowItWorks";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import LuxedriveFooter from "../components/Footer";
import StickyVideoSection from "../components/StickyVideoSection";
import YourBookings from "../components/YourBookings";

export function Home({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <AdminBanner user={user} />
      <IntroSection />
      <BookingSection />
      <RentByBrands />

      
      <section id="available-cars">
        <RentByType />
      </section>

      
      <section id="cars-for-rent">
        <CardList />
      </section>

      
      <section id="how-it-works">
        <HowItWorks />
      </section>

      <StickyVideoSection />

      <YourBookings user={user} />


      <section id="services">
        <ServicesSection />
      </section>

      
      <section id="feedbacks">
        <TestimonialsSection />
      </section>

      
      <section id="contact">
        <LuxedriveFooter />
      </section>
    </>
  );
}
