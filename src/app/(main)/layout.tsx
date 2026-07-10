import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </main>
  );
}