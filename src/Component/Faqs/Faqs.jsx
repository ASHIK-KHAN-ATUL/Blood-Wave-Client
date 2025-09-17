import React, { useState } from "react";

const faqs = [
  {
    question: {
      en: "Who can donate blood?",
      bn: "কে ব্লাড ডোনেট করতে পারে?",
    },
    answer: {
      en: "Anyone who is healthy, 18-65 years old, and meets weight requirements can donate blood.",
      bn: "যারা সুস্থ, 18-65 বছর বয়সী এবং নির্ধারিত ওজন শর্ত পূরণ করে, তারা ব্লাড ডোনেট করতে পারে।",
    },
  },
  {
    question: {
      en: "How often can I donate?",
      bn: "কত সময় অন্তর ব্লাড ডোনেট করা যায়?",
    },
    answer: {
      en: "You can donate whole blood every 3 months, platelets every 2 weeks.",
      bn: "পূর্ণ ব্লাড প্রতি ৩ মাসে একবার, প্লেটলেট প্রতি ২ সপ্তাহে একবার ডোনেট করা যায়।",
    },
  },
  {
    question: {
      en: "Is blood donation safe?",
      bn: "ব্লাড ডোনেশন কি নিরাপদ?",
    },
    answer: {
      en: "Yes, donation is completely safe with sterile equipment and trained staff.",
      bn: "হ্যাঁ, স্টেরাইলাইজড যন্ত্রপাতি এবং প্রশিক্ষিত স্টাফের সাথে ব্লাড ডোনেশন সম্পূর্ণ নিরাপদ।",
    },
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        FAQ / প্রায়শই জিজ্ঞাসিত প্রশ্ন
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <h3 className="font-semibold text-lg">
              {faq.question.en} / {faq.question.bn}
            </h3>
            {openIndex === idx && (
              <p className="mt-2 text-gray-700">
                {faq.answer.en} / {faq.answer.bn}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
