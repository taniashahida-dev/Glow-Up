
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Hero from "../components/Home/Hero";
import SuccessStory from "@/components/Home/SuccessStory";
import BookingProcess from "@/components/Home/BookingProcess";
import FeaturedStylists from "@/components/Home/FeaturedStylists";
import Testimonials from "@/components/Home/Testimonials";
import Newsletter from "@/components/Home/Newslatter";


export default function Home() {
  return (
  <div>
  
    <Hero></Hero>
    <WhyChooseUs></WhyChooseUs>
    <FeaturedStylists></FeaturedStylists>
    <BookingProcess></BookingProcess>
    <SuccessStory></SuccessStory>
    <Testimonials></Testimonials>
    <Newsletter></Newsletter>
    
  </div>
  );
}
