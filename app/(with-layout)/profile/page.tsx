"use client"

import Button from "@/components/Button";
// icons
import { GridInput } from "@/components/Inputs";
import { FormData } from "@/types/form";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";

export default function Profile() {

    const [ profileData, setProfileData ] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
    })

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
      <form className="space-y-6">
            <GridInput
            type="text"
            name="first_name"
            label="First name*"
            placeholder="e.g. John"
            value={profileData}
            setValue={setProfileData}
            />
            <GridInput
            type="text"
            name="last_name"
            label="Last name*"
            placeholder="e.g. Doe"
            value={profileData}
            setValue={setProfileData}
            />
            <GridInput
            type="email"
            name="email"
            label="Email address"
            placeholder="e.g. alex@email.com"
            value={profileData}
            setValue={setProfileData}
            />

            <div className="space-y-6 pt-4">
                <hr className="border-grey-50 mt-2 -mx-4" />

                <div className="flex justify-end">
                    <Button text="Save" disabled={true} auto />
                </div>
            </div>
        </form>
      </div>
    </div>
  )
}