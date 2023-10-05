import Image from "next/image";
import ImageSlider from "../app/components/ImageSlider";
import PoetSection from "../app/components/PoetSection";
export default function Home() {
  return (
    <section>
      <ImageSlider />
      <PoetSection />
    </section>
  );
}
