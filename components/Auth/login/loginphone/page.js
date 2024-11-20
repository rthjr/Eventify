"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPhone() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(null);

  const handlePhoneVerify = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber }), // Fixed the key
      });

      if (res.ok) {
        setVerify(true); // Move to OTP input
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (res.ok) {
        const phone = "0123456789";
        const otp = "123456";
        await signIn('phoneCredentials', { phone,
          otp,
          redirect: false,
          callbackUrl: "/", })
        router.push('/')
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
      <div className="w-full lg:w-6/12 h-auto p-4 lg:p-10">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-black font-bold text-2xl md:text-3xl lg:text-4xl">
            Login with Phone Number
          </h1>
          <div className="mt-10 flex flex-col justify-center w-9/12">
            <form
              className="flex flex-col mb-8"
              onSubmit={verify ? handleOtpVerify : handlePhoneVerify}
            >
              {!verify ? (
                <>
                  <label htmlFor="phone" className="mb-2 font-bold">
                    Phone Number
                  </label>
                  <input
                    className="border-2 p-2 rounded-xl border-black mb-6"
                    type="tel"
                    value={phoneNumber}
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="otp" className="mb-2 font-bold">
                    OTP
                  </label>
                  <input
                    className="border-2 p-2 rounded-xl border-black mb-6"
                    type="text"
                    value={otp}
                    required
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </>
              )}
              <button
                type="submit" // Changed type to "submit"
                className="p-3 border-none rounded-xl bg-customPurple-default hover:bg-customPurple-hover text-center text-white"
              >
                {verify ? "Verify OTP" : "Send OTP"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
