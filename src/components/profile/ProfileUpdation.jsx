import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { backend_url } from "../../server";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileUpdation = () => {
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={`${backend_url}/${user?.avatarImage}`}
            alt=""
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
          />
          <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <AiOutlineCamera />
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex-wrap flex justify-between pb-3 gap-y-3">
            <div className="800px:w-[45%] w-full">
              <label htmlFor="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-[95%]`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="800px:w-[45%] w-full">
              <label htmlFor="block pb-2">Email</label>
              <input
                type="text"
                className={`${styles.input} w-[95%]`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full flex-wrap flex justify-between pb-3 gap-y-3">
            <div className="800px:w-[45%] w-full">
              <label htmlFor="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`${styles.input} w-[95%]`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="800px:w-[45%] w-full">
              <label htmlFor="block pb-2">Zip code</label>
              <input
                type="number"
                className={`${styles.input} w-[95%]`}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="w-full flex-wrap flex justify-between pb-3 gap-y-3">
            <div className="800px:w-[45%] w-full">
              <label htmlFor="block pb-2">Address 1</label>
              <input
                type="text"
                className={`${styles.input} w-[95%]`}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
            </div>
            <div className="800px:w-[45%] w-full">
              <label htmlFor="block pb-2">Address 2</label>
              <input
                type="text"
                className={`${styles.input} w-[95%]`}
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
          <input
            type="submit"
            value="Update"
            className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default ProfileUpdation;
