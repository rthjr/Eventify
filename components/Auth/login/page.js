"use client";
import Image from "next/image";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "@node_modules/next/link";
import { useRouter } from "@node_modules/next/navigation";
import styles from "@styles/login.module.css";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { FaPhone } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export default function Login() {
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  //handle facebook
  const handleSignInFacebook = async () => {
    await signIn('facebook', { callbackUrl: '/' })
  }

  //handle google sign in 
  const handleSignInGoogle = async () => {
    await signIn('google', { callbackUrl: '/' })
  }

  //handle phone number click 
  const phoneNumberClick = () => {
    router.push('/login/loginwithphone')
  }


  //function for handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("emailCredentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
        return;
      }
      router.replace("/");

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setError(""); // Clear the error message
  };

  return (
    <div>
      <div className={styles.loginForm}>
        {/* Login content, full width on small screens */}
        <div className={`${styles.loginContent} h-screen w-full lg:w-6/12`}>
          <Link href="/" className="p-4">
            <Image
              src="/assets/logo/eventifyLogo.png" // Path relative to the public folder
              alt="Website Logo"
              width={150}
              height={50}
            />
          </Link>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-black font-bold text-center text-2xl md:text-3xl lg:text-4xl">
              Log in
            </h1>

            <p className="text-center">
              Welcome back! Please enter your details.
            </p>

            <div className="mt-10 flex flex-col justify-center w-9/12">
              <form onSubmit={handleSignIn}>
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-2 font-bold">
                    Email
                  </label>
                  <input
                    className="border-2 p-2 rounded-xl border-black mb-6"
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="password" className="mb-2 font-bold">
                    Password
                  </label>
                  <div className="border-2 p-2 rounded-xl border-black mb-2 w-full">
                    <input
                      className="border-none outline-none w-full"
                      type="password"
                      required
                      placeholder="Enter your Password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* icon */}
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <Link href="/login/forgotpassword">
                    <u>Forgot Password?</u>
                  </Link>
                  <span>
                    Do not have an account?{" "}
                    <strong>
                      <Link href="/signup">Create</Link>
                    </strong>
                  </span>
                </div>

                <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover w-full">
                  Login
                </button>
                <div className={`${styles.orLine} w-full mb-4`}>or</div>

                {/* add icon phone number */}

              </form>
              <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover w-full flex items-center justify-center" onClick={phoneNumberClick}>
                <FaPhone size={24} className="mr-2" />
                <span>Phone Number</span>
              </button>
              <span className = "text-center">Other login method</span>
              {/* add other method with facebook and google */}
              <div className="w-full flex  justify-center items-center">
                <div className="flex gap-4 mt-4">
                  {providers && providers.facebook && (
                    <div>

                      <button onClick={handleSignInFacebook} >
                        <FaFacebookSquare className="text-4xl" />
                      </button>

                    </div>
                  )}
                  {providers && providers.google && (
                    <div>
                      <button onClick={handleSignInGoogle}>
                        <FaGoogle className="text-4xl" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image div, hidden on small screens and shown on large screens */}
        <div className="hidden lg:flex w-full lg:w-6/12 bg-customPurple-default justify-center items-center">
          <Image
            src="/assets/loginim/loginamico.png" // Ensure the path is correct
            alt="login image"
            width={500} // Provide the image's dimensions for optimization
            height={300}
          />
        </div>
      </div>

      {error && (
        <div className="absolute top-0 h-full w-full z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white shadow-lg w-fit text-white text-sm py-1 px-3 rounded-md mt-2 z-50">
            {/* error form habling */}
            <div className=" lg:w-96 lg:h-96 text-white text-sm py-2 px-4 rounded-md flex flex-col items-center justify-center">
              <RxCrossCircled size={100} color="red" />
              <span className="my-5 text-black">Wrong Password or Email!</span>
              <button
                onClick={handleCancel}
                className="mt-2 bg-white text-black py-1 p-3 border-2 border-black rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
