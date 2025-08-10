import { Heart } from 'lucide-react';
import React from 'react';
import logo from '../../assets/logo-blood-wave.png'

const AboutSection = () => {
    return (
 <section className="bg-red-500/5  py-10 px-8 mx-5 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-[#e50914] mb-10 tracking-wide">
        আমাদের সম্পর্কে
      </h2>

      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center ">
        {/* Left text content */}
        <div className="md:w-1/2 space-y-6 text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed">
          <p>
            <span className="font-semibold text-[#e50914]">BloodWave</span> হলো একটি স্বেচ্ছাসেবী প্ল্যাটফর্ম, যার উদ্দেশ্য রক্তদানকে সহজ, নিরাপদ এবং দ্রুত করে তোলা।
          </p>
          <p>
            আমরা বিশ্বাস করি, একজন মানুষের রক্ত অন্য এক জন মানুষের জীবন বাঁচাতে পারে। প্রতিটি রক্তদান একটি নতুন জীবনের শুরু।
          </p>
          <p>
            এই প্ল্যাটফর্মে আপনি <span className="font-semibold">রক্তদাতা হিসেবে নিবন্ধন</span> করতে পারবেন, কিংবা জরুরি প্রয়োজনে <span className="font-semibold">রক্তের অনুরোধ</span> করতে পারবেন।
          </p>
          <p className="italic text-[#b91c1c] font-semibold">
            রক্তদান করুন, জীবন বাঁচান — কারণ একসাথে আমরা পারি।
          </p>
        </div>

        {/* Right icon */}
        <div className="md:w-1/2 flex justify-center">
          {/* <Heart size={120} color="#e50914" strokeWidth={1} />
           */}
           <img className='w-36 md:w-[65%]' src={logo} alt="logo" />
        </div>
      </div>
    </section>
    );
};

export default AboutSection;