// components/ProfilePicture.js

const ProfilePicture = ({ src, name }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={src}
        alt={`Profile picture of ${name}`}
        className="w-24 h-24 rounded-full mb-2"
      />
      {name && <p className="text-lg">{name}</p>}
    </div>
  );
};

export default ProfilePicture;
