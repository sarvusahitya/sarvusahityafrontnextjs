// components/ProfilePicture.js

const ProfilePicture = ({ src, poet_name }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={src}
        alt={`Profile picture of ${poet_name}`}
        className="w-24 h-24 rounded-full mb-2"
      />
      {poet_name && <p className="text-lg">{poet_name}</p>}
    </div>
  );
};

export default ProfilePicture;
