import Image from "next/image";
// import ImageSlider from "../app/components/ImageSlider";
// import PoetSection from "../app/components/PoetSection";
// import CategorySection from "../app/components/CategorySection";
// import PostSection from "../app/components/PostSection";
import dynamic from "next/dynamic";
const ImageSlider = dynamic(() => import("../app/components/ImageSlider"));
const PoetSection = dynamic(() => import("../app/components/PoetSection"));
const CategorySection = dynamic(
  () => import("../app/components/CategorySection")
);
const PostSection = dynamic(() => import("../app/components/PostSection"));

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
