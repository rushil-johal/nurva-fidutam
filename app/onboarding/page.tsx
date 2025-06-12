"use client";

import React, { useState } from 'react';
import { FaDollarSign, FaBox, FaChartLine, FaTags, FaMoneyBill, FaClock, FaChartArea, FaPhone } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormInputProps {
    label: string;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, placeholder, icon, name, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-nurva1 text-sm font-bold mb-2" htmlFor={label.toLowerCase().replace(/\s/g, '')}>
                {icon} {label}
            </label>
            <input
                className="shadow appearance-none border-2 border-nurva2 rounded-2xl w-full py-2 px-3 text-gray-700 hover:border-nurva1 leading-tight focus:outline-none focus:shadow-outline"
                id={label.toLowerCase().replace(/\s/g, '')}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const SellItemForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        currencyName: '',
        loanMoneyAvailable: '',
        itemBeingSold: '',
        costToBuy: '',
        goalToSell: '',
        timeRemain: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault();

        Object.entries(formData).forEach(([key, value]) => {
            sessionStorage.setItem(key, JSON.stringify(value));
        });

        if (action === 'advice') {
            handleSubmitAdvice();
        } else if (action === 'track') {
            handleSubmitTrack();
        } else if (action === 'interact') {
            handleSubmitInteract();
        }
    };

    const handleSubmitAdvice = async () => {
        const prompt = `Analyze the following business data:
        Currency Name: ${formData.currencyName}
        Loan Money Available: ${formData.loanMoneyAvailable}
        Item being sold: ${formData.itemBeingSold}
        Cost to buy per item: ${formData.costToBuy}
        Goal of total money to sell: ${formData.goalToSell}
        Time Remaining in months: ${formData.timeRemain}

        With this information, Determine these four values for the user:
        
        1) Ideal cost per unit to sell to reach goal, 2) Profit range needed, 3) Daily scheduling goals based on time remaining, 4) Amount of units to buy to reach goal and all these 4 components from their Selling plan information. 
        
        In your response just output in this format so that a parsing function will pick it up:
        "Ideal Cost to Sell to reach goal" = (the value you calculate and a sentence of very very very specific advice to them based on items they are selling and the country they are in indicated by the currency)
        "Range of Profit to be generated" = (the range values indicated by highest number-lowest number and a sentence of very very very specific advice to them based on items they are selling and the country they are in indicated by the currency)
        "Daily scheduling goals" = (a 5-day in a week plan where you give a concise goal for Monday, Tuesday and the remaining 3 days. Don't give in new line bullet points, rather give in normal sentences in a paragraph directing through each day of the week. Be very concise no long responses) 
        "Amount of units to buy to reach goal" = (value range and a sentence of very very very specific advice to them based on items they are selling and the country they are in indicated by the currency)
        
        some constraints for you now though:
        
        - no value in the ranges can be 0, like that don't make sense and doesn't help user.
        - generate the scheduling plan for a 5-day week, with respect to the time remaining in terms of months they have, right. take that into context as well.`;

        try {
            console.log("Sending request to API with prompt:", prompt);
            const response = await fetch("/api/general_api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            const advicedata = data.choices[0].message.content;
            console.log("Advise:", advicedata);

            sessionStorage.setItem('openAIResponse', advicedata);

            router.push('/advice');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmitTrack = async () => {
    };

    const handleSubmitInteract = async () => {
        const query = new URLSearchParams(formData).toString();
        router.push(`/assistant?${query}`);
    };

    return (
        <div className="bg-nurva4 min-h-screen font-nurvafont border-2 border-black rounded-xl p-4 hover:shadow-lg">
            <header className="flex justify-between p-4">
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/fidulogo.png" alt="Logo" className="h-8 w-8 mr-2" />
                    </Link>
                    <h1 className="text-xl font-bold">Nurva</h1>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center h-3/4">
                <h2 className="text-2xl font-bold mb-8 border-2 border-white rounded-2xl p-4">Your Business <FaChartLine className="inline-block ml-2" /></h2>

                <form className="bg-nurva3 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={(e) => handleSubmit(e, 'advice')}>
                    <FormInput
                        label="Currency Name"
                        type="text"
                        placeholder="Enter currency name"
                        icon={<FaDollarSign className="inline-block mr-2" />}
                        name="currencyName"
                        value={formData.currencyName}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Loan Money Available"
                        type="number"
                        placeholder="Enter Loan Money Available"
                        icon={<FaMoneyBill className="inline-block mr-2" />}
                        name="loanMoneyAvailable"
                        value={formData.loanMoneyAvailable}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Item being sold"
                        type="text"
                        placeholder="Enter item name"
                        icon={<FaBox className="inline-block mr-2" />}
                        name="itemBeingSold"
                        value={formData.itemBeingSold}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Cost to buy per item"
                        type="number"
                        placeholder="Enter cost to buy per item"
                        icon={<FaDollarSign className="inline-block mr-2" />}
                        name="costToBuy"
                        value={formData.costToBuy}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Goal to sell"
                        type="number"
                        placeholder="Enter goal to sell"
                        icon={<FaChartLine className="inline-block mr-2" />}
                        name="goalToSell"
                        value={formData.goalToSell}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Time remaining in months"
                        type="number"
                        placeholder="Enter time remaining"
                        icon={<FaClock className="inline-block mr-2" />}
                        name="timeRemain"
                        value={formData.timeRemain}
                        onChange={handleChange}
                    />
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-nurva2 text-nurva3 font-bold mr-4 text-sm p-2 rounded mt-2 focus:outline-none focus:shadow-outline rounded-xl hover:bg-nurva1"
                            type="button"
                            onClick={async (event) => {
                                await handleSubmit(event, 'advice');
                            }}
                        >
                            <FaTags className="inline-block mr-1" /> Submit for Advice
                        </button>
                        <button
                            className="bg-nurva2 text-nurva3 font-bold mr-4 text-sm p-2 rounded mt-2 focus:outline-none focus:shadow-outline rounded-xl hover:bg-nurva1"
                            type="button"
                            onClick={async (event) => {
                                await handleSubmit(event, 'track');
                            }}
                        >
                            <FaChartArea className="inline-block mr-1" /> Submit to Track
                        </button>
                        <button
                            className="bg-nurva2 text-nurva3 font-bold mr-4 text-sm p-2 rounded mt-2 focus:outline-none focus:shadow-outline rounded-xl hover:bg-nurva1"
                            type="button"
                            onClick={async (event) => {
                                await handleSubmit(event, 'interact');
                            }}
                        >
                            <FaPhone className="inline-block mr-1" /> Submit to Interact
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default SellItemForm;
