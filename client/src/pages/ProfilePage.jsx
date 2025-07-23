import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const {authUser, updateProfile} = useContext(AuthContext);

  console.log('authUser', authUser);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName??'John Doe');
  const [bio, setBio] = useState(authUser.bio??'Hi Everyone, I am using QuickChat');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImg) {
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({fullName: name, bio, profilePic: base64Image});
      navigate('/');
    }
  };


  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4">
      <div className="w-full max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col rounded-lg overflow-hidden shadow-md bg-white/10">
        
        {/* Form Section */}
        <form className="flex flex-col gap-5 p-8 flex-1 w-full">
          <h3 className="text-2xl font-semibold mb-2">Profile Page</h3>

          <label htmlFor="avatar" className="flex items-center gap-4 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              hidden
              id="avatar"
              accept=".png, .jpg, .jpeg"
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) :authUser?.profilePic? authUser?.profilePic : assets.avatar_icon}
              alt="avatar"
              className="w-14 h-14 object-cover rounded-full border border-gray-400"
            />
            <span className="text-sm text-white/80">Upload Profile Picture</span>
          </label>

          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border border-gray-500 rounded-md p-2 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Write Down Your Bio"
            className="bg-white/10 border border-gray-500 rounded-md p-2 text-white placeholder-gray-300 resize-none outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!name || !bio}
            className="bg-violet-600 hover:bg-violet-700 transition-all text-white font-semibold py-2 px-4 rounded-md mt-2"
          >
            Save
          </button>
        </form>

        {/* Logo Section */}
        <div className="hidden sm:flex items-center justify-center p-8">
          <img src={authUser?.profilePic || assets.logo_icon} alt="logo" className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt:10 ${authUser?.profilePic && 'rounded-full object-cover'}`} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
