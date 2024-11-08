import Image from "next/image";

export default function Register() {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            <div className="hidden lg:flex w-full lg:w-6/12 justify-center items-center bg-customPurple-default">
                <Image
                    src="/assets/logo/register.png"
                    alt="register image"
                    width={150}
                    height={50}
                />
            </div>

            <div className="w-full lg:w-6/12 h-auto p-4 lg:p-10">
                <a href="/" className="bg-customPurple-default text-white rounded-lg p-4 hover:bg-customPurple-hover mb-4 lg:mb-0">Back</a>

                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-center font-bold text-xl mb-8">Create Account</h1>
                    <div className="w-full lg:w-4/5">
                        <form action="" className="flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input type="email" className="mb-2 border-black rounded-lg border-2 p-2" required placeholder="Enter email here" />
                        </form>

                        <form action="">
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="firstName">Firstname</label>
                                <input type="text" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="Enter name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="lastName" className="mb-2">Lastname</label>
                                <input type="text" className="mb-2 border-black rounded-lg border-2 p-2" required placeholder="Enter name" />
                            </div>
                        </form>

                        <form action="" className="flex flex-col">
                            <label htmlFor="password" className="mb-2">Password</label>
                            <input type="password" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="enter password here" required />
                        </form>

                        <form action="" className="flex flex-col">
                            <label htmlFor="password" className="mb-2">Confirm Password</label>
                            <input type="password" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="enter password here" required />
                        </form>

                        <div className="flex justify-between mt-4">
                            <div></div>
                            <button className="p-2 bg-customPurple-default hover:bg-customPurple-hover text-white border-none rounded-lg">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}