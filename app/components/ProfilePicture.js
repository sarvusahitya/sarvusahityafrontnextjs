// components/ProfilePicture.js
import Image from "next/image";

const ProfilePicture = ({ src, name }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={src}
        className="w-24 h-24 rounded-full mb-2"
        width={800}
        height={400}
      />
      {name && <p className="text-lg">{name}</p>}
    </div>
  );
};

export default ProfilePicture;
