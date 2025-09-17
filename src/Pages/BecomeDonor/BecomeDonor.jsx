import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const BecomeDonor = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedDivision, setSelectedDivision] = useState("");

  const divisionsData = {
    Dhaka: [
      "Dhaka",
      "Faridpur",
      "Gazipur",
      "Gopalganj",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Narayanganj",
      "Narsingdi",
      "Tangail",
    ],
    Chittagong: [
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Chattogram",
      "Cumilla",
      "Cox's Bazar",
      "Feni",
      "Khagrachari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
    ],
    Rajshahi: [
      "Bogra",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Chapainawabganj",
      "Pabna",
      "Rajshahi",
      "Sirajganj",
    ],
    Khulna: [
      "Bagerhat",
      "Chuadanga",
      "Jashore",
      "Jhenaidah",
      "Khulna",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
    ],
    Barisal: [
      "Barguna",
      "Barishal",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
    ],
    Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
    Rangpur: [
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Rangpur",
      "Thakurgaon",
    ],
    Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const { data: mainUser = [], isLoading } = useQuery({
    queryKey: ["mainUser"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`users/user/${user?.email}`);
      return res.data;
    },
  });
  // console.log("mainUser:", mainUser);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
        <p className="text-red-500 font-semibold text-2xl">
          Loading Become Donor Page
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
      </div>
    );
  }

  const onSubmit = (data) => {
    data.name = mainUser.name;
    data.role = "donor";

    const userId = mainUser._id;
    axiosPublic
      .patch(`/users/user/become-donor/${userId}`, data)
      .then((res) => {
        // console.log('User Updated:', res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");
        } else {
          toast.info("তথ্যে কোনো পরিবর্তন হয়নি।");
        }
      })
      .catch((error) => {
        console.error("Updated failed", error);
      });
  };

  return (
    <div className=" md:max-w-3xl m-2 md:mx-auto p-6 bg-gradient-to-br from-[#fa5d5d62] via-[#ffe5f183] to-[#b7f5f59a] shadow-lg md:rounded-md  md:my-10 text-black">
      <Helmet>
        <title>Become a Blood Donor | Blood Wave</title>
        <meta
          name="description"
          content="Join Blood Wave as a blood donor and help save lives. Fill the form to become a registered donor."
        />
        <meta
          name="keywords"
          content="blood donor, blood donation, become donor, blood wave"
        />
        <link
          rel="canonical"
          href="https://blood-wave.netlify.app/dashboard/becomeDonor"
        />
      </Helmet>

      <h2 className="text-lg mb-8 md:text-2xl font-bold text-red-600 md:mb-6 text-center">
        Become a Blood Donor
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 text-xs grid grid-cols-1  md:grid-cols-2 md:gap-5 md:space-y-0"
      >
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium ">Full Name</label>
          <input
            type="text"
            defaultValue={mainUser?.name}
            readOnly
            {...register("name", { required: "Name is required" })}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100 "
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            defaultValue={""}
            {...register("bloodGroup", { required: "Blood group is required" })}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          >
            <option disabled value="">
              Select Blood Group
            </option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-sm text-red-600 mt-1">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            {...register("birthDate", {
              required: "Date of Birth is required",
            })}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          />
          {errors.birthDate && (
            <p className="text-sm text-red-600 mt-1">
              {errors.birthDate.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="mt-4">
          <label className="block mb-1 font-medium ">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            defaultValue={""}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100  "
          >
            <option disabled value="">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Division */}
        <div>
          <label className="block mb-1 font-medium">Division</label>
          <select
            {...register("division", { required: "Division is required" })}
            defaultValue={""}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          >
            <option disabled value="">
              Select Division
            </option>
            {Object.keys(divisionsData).map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
          {errors.division && (
            <p className="text-sm text-red-600 mt-1">
              {errors.division.message}
            </p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <select
            {...register("district", { required: "District is required" })}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          >
            <option disabled value="">
              Select District
            </option>
            {selectedDivision &&
              divisionsData[selectedDivision]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
          {errors.district && (
            <p className="text-sm text-red-600 mt-1">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* Area */}
        <div>
          <label className="block mb-1 font-medium">Area</label>
          <input
            type="text"
            {...register("area")}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          />
        </div>

        {/* Last Donation Date */}
        <div>
          <label className="block mb-1 font-medium">Last Donation Date</label>
          <input
            type="date"
            {...register("lastDonation")}
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium ">Availability Status</label>
          <select
            {...register("availability", {
              required: "Availability is required",
            })}
            defaultValue={""}
            className="w-full p-1 md:px-4 md:py-2 border  rounded focus:outline-none bg-red-100  "
          >
            <option disabled value="">
              Select Status
            </option>
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
          </select>
          {errors.availability && (
            <p className="text-sm text-red-600 mt-1">
              {errors.availability.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message (Optional)</label>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Any additional message..."
            className="w-full p-1 md:px-4 md:py-2 border rounded focus:outline-none bg-red-100"
          />
        </div>

        {/* Phone visibility */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number Visibility
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="public"
                {...register("phoneVisibility", { required: true })}
              />{" "}
              Public
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="private"
                {...register("phoneVisibility", { required: true })}
              />{" "}
              Private
            </label>
          </div>
          {errors.phoneVisibility && (
            <p className="text-sm text-red-600 mt-1">
              {" "}
              Please select phone number visibility{" "}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("consent", { required: true })}
            className="mt-1"
          />
          <label className="text-sm">
            I agree to be contacted for donation requests and I confirm the
            information is correct.
          </label>
        </div>
        {errors.consent && (
          <p className="text-sm text-red-600 mt-1">
            You must give your consent
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-[65%] md:col-span-2 mx-auto bg-green-500 text-white font-semibold py-2 rounded hover:bg-teal-500 hover:scale-x-90 duration-500 cursor-pointer transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BecomeDonor;
