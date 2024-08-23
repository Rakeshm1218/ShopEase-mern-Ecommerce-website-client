import { useEffect, useState } from "react";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Loader from './../../components/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from "../../redux/features/auth/authSlice";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const updateHandler = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
        toast.error("Passwords do not match")
    }else{
        try {
            const res = await updateProfile({_id: userInfo._id,username,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error?.data?.message) || error.message
        }
    }
  }

  return (
    <div className="container mx-auto p-4 pt-[5rem]">
      <div className="flex flex-col justify-center items-center md:flex md:space-x-4">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

        <div className="md:w-1/3" onSubmit={updateHandler}>
          <form>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="p-3 rounded-sm w-full bg-neutral-600 border  text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="p-3 rounded-sm w-full bg-neutral-600 border  text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="p-3 rounded-sm w-full bg-neutral-600 border  text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="p-3 rounded-sm w-full bg-neutral-600 border  text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600">
                    Update
                </button>
                <Link to='/user-orders' className="bg-amber-500 py-2 px-4 rounded text-white hover:bg-amber-600">
                My Orders</Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader/>}
      </div>
    </div>
  );
};

export default Profile;
