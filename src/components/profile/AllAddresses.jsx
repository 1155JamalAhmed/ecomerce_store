import { Button } from "@mui/material";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddAddressPopup from "../popups/AddAddressPopup";
import ActionPopup from "../popups/ActionPopup";
import store from "../../redux/store";
import { removeUserAddress } from "../../redux/actions/userActions";

const AllAddresses = () => {
  const { user } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-full px-5">
        <div className="flex flex-wrap w-full items-center justify-between mb-4">
          <h1 className={`${styles.profileHeading}`}>My Addresses</h1>
          <Button
            variant="contained"
            color="tertiary"
            onClick={() => setOpenModal(true)}
            size="large"
          >
            Add New Address
          </Button>
        </div>
        <div className="space-y-4">
          {user.addresses.map((address, index) => (
            <Address key={index} address={address} />
          ))}
        </div>
      </div>
      <AddAddressPopup open={openModal} setOpen={setOpenModal} />
    </>
  );
};

const Address = ({ address }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const addressDeletionConfirmHandler = async (addressId) => {
    setDeleting(true);
    try {
      await store.dispatch(removeUserAddress(addressId));
    } catch (err) {
    } finally {
      setDeleting(false);
      setDeletePopup(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-row sm:items-center justify-between p-5 bg-white rounded-[4px] shadow-md ">
        <h5 className="font-[600] flex-[40%] sm:flex-1 sm:min-w-[60px]">
          {address.addressType}
        </h5>
        <h6 className="w-full my-3 sm:my-0 sm:max-w-[250px] overflow-hidden order-1 sm:order-none">
          {address.fullAddress}
        </h6>
        <h6 className="flex-[40%] sm:flex-1">{address.zipCode}</h6>
        <div
          className="min-w-[20px] flex items-center justify-end"
          onClick={() => setDeletePopup(true)}
        >
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
      <ActionPopup
        open={deletePopup}
        setOpen={setDeletePopup}
        message="Do you want to delete this address?"
        productToBeDeleted={address._id}
        executeAction={addressDeletionConfirmHandler}
        isDeleting={deleting}
      />
    </>
  );
};

export default AllAddresses;
