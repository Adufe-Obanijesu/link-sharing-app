"use client"

import Button from "@/components/Button";
// icons
import { GridInput } from "@/components/Inputs";
import { FormData } from "@/types/form";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IoImageOutline } from "react-icons/io5";

import { useUpdateDoc, useFetch } from "@/firebase/firestore";
import { notify } from "@/utils/notification";
import { Context } from "@/components/SiteWrapper";

export default function Profile() {
  const context = useContext(Context);
  const user = context?.user;
  const userDetails = context?.userDetails;

  const { updateDocument } = useUpdateDoc();

  const [ loading, setLoading ] = useState(false);

  const [ profileData, setProfileData ] = useState<FormData>({
      first_name: "",
      last_name: "",
      email: "",
  })

  useEffect(() => {
    if (userDetails) {
      setProfileData(userDetails);
    }
  }, [userDetails]);

  const disable = !profileData.first_name && !profileData.last_name && !profileData.email;

  const [ validate, setValidate ] = useState({
    status: true,
    email: "",
    first_name: "",
    last_name: "",
  })

  const validateProfileData = () => {
    const { email, first_name, last_name } = profileData;

    const response = {
      status: true,
      email: "",
      first_name: "",
      last_name: "",
    }
  
    // Check if fields are not empty
    if (!first_name) response.first_name = "Can't be empty";
    if (!last_name) response.last_name = "Can't be empty";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) response.email = "Invalid email";
    
    if (!first_name || !last_name || (email && !emailRegex.test(email))) response.status = false;

    return response;
  }

  const updateProfileData = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const validateForm = validateProfileData();
    setValidate(validateForm)
    if (!validateForm.status){
      setLoading(false);
      return;
    }

    try {
      const response = await updateDocument({
        id: user?.id,
        data: profileData,
        fieldPath: "users",
      })

      if (response.status) {
        notify("Profile updated");
      } else {
        notify("Error updating profile", "error");
      }
    } catch(err) {
      notify("Error updating profile", "error");
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3>
          Profile Details
        </h3>
        <p>
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <div className="p-4 bg-grey-20 rounded-lg">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="v-center">
                <p>
                    Profile picture
                </p>
            </div>

            <div className="rounded-md bg-primary-20 text-primary text-center space-y-2 py-12 cursor-pointer w-3/4 md:w-full">
                <IoImageOutline className="text-5xl inline mx-auto" />
                <p className="font-semibold text-primary">
                    + Upload Image
                </p>
            </div>

            <div className="v-center">
                <p className="text-xs">
                    Image must be below 1024x1024px.
                    <br />
                    Use PNG or JPG format
                </p>
            </div>
        </div>
      </div>

      <div className="p-4 bg-grey-20 rounded-lg">
      <form className="space-y-6" onSubmit={updateProfileData}>
            <GridInput
            type="text"
            name="first_name"
            label="First name*"
            placeholder={!userDetails ? "Loading data..." : "e.g. John"}
            value={profileData}
            setValue={setProfileData}
            error={validate}
            />
            <GridInput
            type="text"
            name="last_name"
            label="Last name*"
            placeholder={!userDetails ? "Loading data..." : "e.g. Doe"}
            value={profileData}
            setValue={setProfileData}
            error={validate}
            />
            <GridInput
            type="email"
            name="email"
            label="Email address"
            placeholder={!userDetails ? "Loading data..." : "e.g. alex@email.com"}
            value={profileData}
            setValue={setProfileData}
            error={validate}
            />

            <div className="space-y-6 pt-4">
                <hr className="border-grey-50 mt-2 -mx-4" />

                <div className="flex justify-end">
                    <Button text="Save" disabled={disable || loading || !userDetails?.id} auto loading={loading} />
                </div>
            </div>
        </form>
      </div>
    </div>
  )
}