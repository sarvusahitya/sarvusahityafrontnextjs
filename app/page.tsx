import Image from "next/image";
import ImageSlider from "../app/components/ImageSlider";
import PoetSection from "../app/components/PoetSection";
import CategorySection from "../app/components/CategorySection";
import PostSection from "../app/components/PostSection";
export default function Home() {
  return (
    <section>
      <ImageSlider />
      <CategorySection />
      <PoetSection />
      <PostSection />
    </section>
  );
}
