import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { FormEvent, useEffect, useState } from 'react';
import { loadUserDataFromLocalStorage, setProfileImage } from "../../features/api/authAsyncThunk.api";
import { Auth } from "../../features/authSlice";
const ProfileImageUpdate = () => {

  const [userData, setUserData] = useState<Auth | null>({
    _id: '',
    userName: '',
    email: '',
    password: '',
    role: '',
    profileImg: '',
    token: '',
    customerId: '',
});
  const [newProfileImage, setNewProfileImage] = useState<string>('');
  const authSlice = useAppSelector((state) => state.authSlice)
  const defaultProfileImage = '../../../public/default-profile-image/default-profile-image.webp'
  const dispatch = useAppDispatch()

useEffect(() => {
const userData = loadUserDataFromLocalStorage()
setUserData(userData)
console.log(userData);
},[authSlice.auth])

  const setSlectedProfileImageInState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProfileImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const updateProfileImage = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
if (formData) {
  dispatch(setProfileImage({endPoint:'http://localhost:8000/users/uploadProfileImage',formData, headers: { 'Authorization': `Bearer ${userData?.token}` }}))
} else{
  console.log('please fill in the profile image before  sending');
}
  }

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form className="flex flex-col items-center justify-center gap-5" onSubmit={(e) => {
        e.preventDefault();
        updateProfileImage(e)
      }}>
        <input onChange={(e) => {
          e.preventDefault();
          setSlectedProfileImageInState(e)
        }} id="profileImage" className="hidden" type="file" name='file' />
        <img className={`${newProfileImage ? 'hidden' : 'block'} rounded-full w-56 h-56`} src={`${userData?.profileImg? `../../../public/${userData?.profileImg}`: defaultProfileImage}`} alt="profileImage" />
        <img className={`${newProfileImage ? 'block' : 'hidden'} rounded-full w-56 h-56`} src={newProfileImage} alt="profileImage" />
        <label htmlFor="profileImage" className="btn">select image</label>
        <button type="submit" className="btn">change image</button>
      </form>
    </div>
  )
}

export default ProfileImageUpdate
