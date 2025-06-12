"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaInfo } from 'react-icons/fa';

type AnalysisData = {
    idealCostToSell: {
        value: string;
        sentence: string;
    };
    profitRange: {
        value: string;
        sentence: string;
    };
    dailyGoals: {
        value: string;
        sentence: string;
    };
    unitsToBuy: {
        value: string;
        sentence: string;
    };
};

const Dashboard = () => {
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

    useEffect(() => {
        const storedResponse = sessionStorage.getItem('openAIResponse');
        if (storedResponse) {
            const parsedResponse = parseResponse(storedResponse);
            setAnalysis(parsedResponse);
        }
    }, []);

    const parseResponse = (response: string): AnalysisData => {
        const result: Partial<AnalysisData> = {};
        const lines = response.split('\n').map(line => line.trim()).filter(line => line !== "");

        let currentKey: keyof AnalysisData | null = null;
        let currentValue: string[] = [];

        lines.forEach(line => {
            if (line.startsWith('"')) {
                if (currentKey) {
                    const [value, ...sentenceParts] = currentValue.join(' ').split(':');
                    result[currentKey] = {
                        value: value.trim(),
                        sentence: sentenceParts.join(':').trim()
                    };
                }
                const [key, value] = line.split('=').map(part => part.trim().replace(/"/g, ''));
                currentKey = mapKey(key);
                currentValue = [value];
            } else if (currentKey) {
                currentValue.push(line);
            }
        });

        if (currentKey) {
            const [value, ...sentenceParts] = currentValue.join(' ').split(':');
            result[currentKey as keyof AnalysisData] = {
                value: value.trim(),
                sentence: sentenceParts.join(':').trim()
            };
        }

        return result as AnalysisData;
    };

    const mapKey = (key: string): keyof AnalysisData => {
        switch (key) {
            case 'Ideal Cost to Sell to reach goal':
                return 'idealCostToSell';
            case 'Range of Profit to be generated':
                return 'profitRange';
            case 'Daily scheduling goals':
                return 'dailyGoals';
            case 'Amount of units to buy to reach goal':
                return 'unitsToBuy';
            default:
                throw new Error(`Unexpected key: ${key}`);
        }
    };
    function highlightNumbers(text: string) {
        return text.replace(/\d+/g, '<span style="background-color: #e8d28b;">$&</span>');
    }

    return (
        <div className="bg-nurva4 min-h-screen font-nurvafont border-2 border-black rounded-xl p-4 hover:shadow-lg">
            <header className="flex justify-between p-4">
                <div className="flex items-center">
                    <Link href="/">
                        <Image src="/fidulogo.png" alt="Logo" className="h-8 w-8 mr-2" width={32} height={32} />
                    </Link>
                    <h1 className="text-xl font-bold">Nurva</h1>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center h-3/4">
                <h2 className="text-2xl font-bold mb-8 border-2 border-white rounded-2xl p-4">Analysis</h2>
                {analysis && (
                    <div className="w-full max-w-2xl space-y-4">
                        <div className="bg-nurva3 text-black rounded-lg p-4 shadow-md">
                            <h3 className="font-semibold text-white">Ideal Cost to Sell to reach goal</h3>
                            <div className="bg-nurva1 rounded-lg p-4 mt-2">
                                <p className="text-xl">{analysis.idealCostToSell.sentence}</p>
                                <p className="text-xl" dangerouslySetInnerHTML={{ __html: highlightNumbers(analysis.idealCostToSell.value) }}></p>
                            </div>
                        </div>
                        <div className="bg-nurva3 text-black rounded-lg p-4 shadow-md">
                            <h3 className="font-semibold text-white">Range of Profit to be generated</h3>
                            <div className="bg-nurva1 rounded-lg p-4 mt-2">
                                <p className="text-xl">{analysis.profitRange.sentence}</p>
                                <p className="text-xl" dangerouslySetInnerHTML={{ __html: highlightNumbers(analysis.profitRange.value) }}></p>
                            </div>
                        </div>
                        <div className="bg-nurva3 text-black rounded-lg p-4 shadow-md">
                            <h3 className="font-semibold text-white">Daily scheduling goals</h3>
                            <div className="bg-nurva1 rounded-lg p-4 mt-2 whitespace-pre-line">
                                <p className="text-xl">{analysis.dailyGoals.sentence}</p>
                                <p className="text-xl" dangerouslySetInnerHTML={{ __html: highlightNumbers(analysis.dailyGoals.value) }}></p>
                            </div>
                        </div>
                        <div className="bg-nurva3 text-black rounded-lg p-4 shadow-md">
                            <h3 className="font-semibold text-white">Amount of units to buy to reach goal</h3>
                            <div className="bg-nurva1 rounded-lg p-4 mt-2">
                                <p className="text-xl">{analysis.unitsToBuy.sentence}</p>
                                <p className="text-xl" dangerouslySetInnerHTML={{ __html: highlightNumbers(analysis.unitsToBuy.value) }}></p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
