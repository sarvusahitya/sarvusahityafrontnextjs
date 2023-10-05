import Image from "next/image";
import ImageSlider from "../app/components/ImageSlider";
import PoetSection from "../app/components/PoetSection";
import CategorySection from "../app/components/CategorySection";
export default function Home() {
  return (
    <section>
      <ImageSlider />
      <CategorySection />
      <PoetSection />
    </section>
  );
}
