
import WhyChooseUs from "@/components/WhyChooseUs";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import SuccessStory from "@/components/SuccessStory";
import BookingProcess from "@/components/BookingProcess";
import FeaturedStylists from "@/components/FeaturedStylists";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newslatter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
  <div>
    <Navbar></Navbar>
    <Hero></Hero>
    <WhyChooseUs></WhyChooseUs>
    <FeaturedStylists></FeaturedStylists>
    <BookingProcess></BookingProcess>
    <SuccessStory></SuccessStory>
    <Testimonials></Testimonials>
    <Newsletter></Newsletter>
    <Footer></Footer>
  </div>
  );
}
