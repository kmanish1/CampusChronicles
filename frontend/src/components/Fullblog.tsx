import { useState } from "react";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey= import.meta.env.VITE_API_KEY;


//@ts-ignore
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const [summary, setSummary] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    async function run() {
        const prompt = `Write a summary of the text in about 5 lines: ${blog.content}`;
        setLoading(true);
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            setText(text);
            setSummary(true);
            setLoading(false);
            console.log(text);
        } catch (error) {
            console.error("Error generating content:", error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 px-10 w-full pt-20 max-w-screen-xl">
                    <div className="md:col-span-8">
                        <div className="text-5xl font-bold text-gray-900">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on 19 April 2024
                        </div>
                        <button
                            type="button"
                            onClick={run}
                            className="text-white my-4 bg-black focus:bg-green-800 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 "
                        >
                            Summarize
                        </button>
                        {loading && (
                            <div className="py-4">
                                <div className="loader border-t-4 border-blue-600 rounded-full w-12 h-12 mx-auto animate-spin"></div>
                            </div>
                        )}
                        {summary && !loading && (
                            <div className="py-4 bg-white rounded-lg shadow-md p-6 mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
                                <p className="text-gray-700 mt-2">{text}</p>
                            </div>
                        )}
                        <div className="pt-4 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Content</h2>
                            <p className="text-gray-700 mt-2">{blog.content}</p>
                        </div>
                    </div>
                    <div className="md:col-span-4 my-4 md:my-0">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full mt-4">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Senior
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
