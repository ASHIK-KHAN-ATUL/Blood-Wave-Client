import React from 'react';
import  './HowCanBeDonor.css'

const HowCanBeDonor = () => {
    return (
        <div className='pic object-cover'>
            <div className=" flex items-center justify-center py-10 px-4 my-10">
            <div className="max-w-4xl w-full bg-red-500/90 rounded-lg shadow-xl p-8 space-y-6 border border-red-200">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white">How to Become a Donor</h2>

                <div className="space-y-4 text-[#1e1e1e] text-lg">
                    <div>
                        <h3 className="font-semibold md:text-xl text-white">🩸 Step-by-Step (English):</h3>
                        <ul className="list-disc list-inside mt-2 space-y-2 text-sm md:text-base">
                            <li>First, <strong>Register</strong> an account on our website.</li>
                            <li>Then, go to your <strong>Dashboard</strong>.</li>
                            <li>Click on <strong>"Become Donor"</strong> from the Dashboard menu.</li>
                            <li>Fill in all the <strong>required information</strong> (like blood group, location, etc.).</li>
                            <li>Submit the form and you will be added as a donor after verification.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold md:text-xl text-white">🩸 ধাপে ধাপে নির্দেশনা (বাংলা):</h3>
                        <ul className="list-disc list-inside mt-2 space-y-2 text-sm md:text-base">
                            <li>প্রথমে আপনাকে আমাদের ওয়েবসাইটে <strong>রেজিস্টার</strong> করতে হবে।</li>
                            <li>তারপর যান আপনার <strong>ড্যাশবোর্ড</strong>-এ।</li>
                            <li><strong>"Become Donor"</strong> অপশন-এ ক্লিক করুন।</li>
                            <li>আপনার <strong>রক্তের গ্রুপ, ঠিকানা</strong> সহ প্রয়োজনীয় তথ্য পূরণ করুন।</li>
                            <li>সাবমিট করার পর যাচাই শেষে আপনি একজন ডোনার হিসেবে যুক্ত হবেন।</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-white">Your contribution can save lives. Be a hero today. ❤️</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default HowCanBeDonor;