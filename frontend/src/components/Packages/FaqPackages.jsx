import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Plus } from "lucide-react";
import { getAllPackageFaqs } from '../../actions/packageFaqAction';


const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-ink/5 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <span className="font-serif text-lg text-ink font-light tracking-tight">{question}</span>
                <span className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <Plus size={20} />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-ink-light font-jost text-sm leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};


const FaqPackages = () => {
    const dispatch = useDispatch();
    const { faqs } = useSelector((state) => state.packageFaqsReducer);

    useEffect(() => {
        dispatch(getAllPackageFaqs());
    }, [dispatch]);

    return (
        <section className="py-24 sm:py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <span className="font-cinzel text-[10px] tracking-[5px] text-teal block mb-4 uppercase">Assistance</span>
                    <h2 className="font-serif text-4xl sm:text-5xl italic mb-6">Common Questions</h2>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FaqPackages
