// components/ProfilePicture.js
import Image from "next/image";
import { convertToWebP } from "@/utils/ssutils";

const ProfilePicture = ({ src, name }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={convertToWebP(src)}
        className="w-24 h-24 rounded-full mb-2"
        width={800}
        height={400}
        alt="Sarvu Sahitya"
      />
      {name && <p className="text-lg">{name}</p>}
    </div>
  );
};

export default ProfilePicture;
