"use client";

import Button from "@/components/Button";
// icons
import { GridInput } from "@/components/Inputs";
import { FormData } from "@/types/form";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { IoImageOutline } from "react-icons/io5";

import { useUpdateDoc, useFetch } from "@/firebase/firestore";
import { notify } from "@/utils/notification";
import { Context } from "@/components/SiteWrapper";
import { useStorage } from "@/firebase/storage";
import Loader from "@/components/Loader";
import NextImage from "next/image";

export default function Profile() {
  const context = useContext(Context);
  const userDetails = context?.userDetails;

  const { updateDocument } = useUpdateDoc();
  const { upload } = useStorage();

  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [profileData, setProfileData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (userDetails) {
      const { email, first_name, last_name } = userDetails;
      setProfileData({
        first_name,
        last_name,
        email,
      });
    }
  }, [userDetails]);

  const disable =
    !profileData.first_name && !profileData.last_name && !profileData.email;

  const [validate, setValidate] = useState({
    status: true,
    email: "",
    first_name: "",
    last_name: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateProfileData = () => {
    const { email, first_name, last_name } = profileData;

    const response = {
      status: true,
      email: "",
      first_name: "",
      last_name: "",
    };

    // Check if fields are not empty
    if (!first_name) response.first_name = "Can't be empty";
    if (!last_name) response.last_name = "Can't be empty";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) response.email = "Invalid email";

    if (!first_name || !last_name || (email && !emailRegex.test(email)))
      response.status = false;

    return response;
  };

  const updateProfileData = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validateForm = validateProfileData();
    setValidate(validateForm);
    if (!validateForm.status) {
      setLoading(false);
      notify("Fill in all necessary fields", "error");
      return;
    }

    try {
      const response = await updateDocument({
        id: userDetails?.id,
        data: profileData,
        fieldPath: "users",
      });

      if (response.status) {
        notify("Profile updated");
      } else {
        notify("Error updating profile", "error");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      notify("Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  };
  console.log(userDetails);
  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      notify("Only JPG and PNG files are allowed", "error");
      fileInput.value = "";
      return;
    }

    setUploadLoading(true);

    try {
      // Validate image resolution
      const image = await loadImage(file);
      const { width, height } = image;
      if (width > 1024 || height > 1024) {
        notify("Image resolution must be below 1024x1024", "error");
        setUploadLoading(false);
        fileInput.value = "";
        return;
      }

      // Proceed with the upload
      const response = await upload({
        name: `users/${userDetails.register_email}`,
        file,
      });
      const url = response.url;
      if (response.status) {
        const response = await updateDocument({
          id: userDetails?.id,
          fieldPath: "users",
          data: {
            profileImage: url,
          },
        });

        if (response.status) {
          context?.setUserDetails({
            ...userDetails,
            profileImage: url,
          });
          notify("Profile updated!");
        } else {
          notify(response.message, "error");
          fileInput.value = "";
        }
      } else {
        notify(response.message, "error");
        fileInput.value = "";
      }
    } catch (err) {
      notify("Error uploading profile picture", "error");
      fileInput.value = "";
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3>Profile Details</h3>
        <p>Add your details to create a personal touch to your profile.</p>
      </div>

      <div className="p-4 bg-grey-20 rounded-lg">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="v-center">
            <p>Profile picture</p>
          </div>

          <label
            htmlFor="image"
            className="relative rounded-md bg-primary-20 text-primary text-center space-y-2 cursor-pointer w-3/4 md:w-full"
          >
            {userDetails?.profileImage ? (
              <NextImage
                src={userDetails.profileImage}
                alt={userDetails.first_name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="py-12">
                <IoImageOutline className="text-5xl inline mx-auto" />
                <p className="font-semibold text-primary">+ Upload Image</p>
              </div>
            )}

            {(uploadLoading || !userDetails) && (
              <div className="absolute -top-2 left-0 hv-center h-full w-full bg-black/50 rounded-md z-20">
                <Loader />
              </div>
            )}
          </label>

          <input
            type="file"
            id="image"
            onChange={uploadImage}
            className="hidden"
            accept=".jpg,.jpeg,.png"
            ref={fileInputRef}
          />

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
            placeholder={
              !userDetails ? "Loading data..." : "e.g. alex@email.com"
            }
            value={profileData}
            setValue={setProfileData}
            error={validate}
          />

          <div className="space-y-6 pt-4">
            <hr className="border-grey-50 mt-2 -mx-4" />

            <div className="flex justify-end">
              <Button
                text="Save"
                disabled={disable || loading || !userDetails?.id}
                auto
                loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
