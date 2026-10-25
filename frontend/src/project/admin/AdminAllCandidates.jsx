import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AdminAllCandidates = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [userDetails] = useState(() => {
        const data = Cookies.get("DevColab");

        if (!data || data === "undefined") {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error("Invalid DevColab cookie:", error);
            return null;
        }
    });

    const companyCode = userDetails?.companyCode;

    useEffect(() => {
        const getAllUsers = async () => {
            if (!companyCode || typeof companyCode !== "string") {
                setError(
                    "User details or company code is missing. Please login again."
                );
                setLoading(false);
                return;
            }

            try {
                const API_URL = import.meta.env.VITE_API_URL;

                if (!API_URL) {
                    throw new Error("Backend API URL is not configured.");
                }

                const res = await fetch(
                    `${API_URL}/admin/getAllUsers?companyCode=${encodeURIComponent(
                        companyCode.trim()
                    )}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error(
                        `Failed to fetch candidates. Status: ${res.status}`
                    );
                }

                const data = await res.json();

                setUsers(
                    Array.isArray(data.users) ? data.users : []
                );
            } catch (err) {
                console.error("Error fetching candidates:", err);
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        getAllUsers();
    }, [companyCode]);

    if (loading) {
        return (
            <div className="min-h-screen w-full md:w-[80%] absolute right-0 bg-gray-700 flex justify-center items-center text-xl md:text-[2rem] text-white">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full md:w-[80%] absolute right-0 bg-gray-700 flex flex-col justify-center items-center gap-4 p-6 text-white">
                <h1 className="text-xl md:text-2xl font-bold">
                    Unable to Load Candidates
                </h1>
                <p className="text-center text-red-300">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full md:w-[80%] absolute right-0 bg-gray-700 pt-16 md:pt-6 pb-6 text-white">
            <div className="mx-4 md:mx-9 p-4 md:p-5 bg-gray-800 rounded-[1rem] shadow-lg">
                <h2 className="text-lg md:text-xl font-bold border-b border-gray-600 pb-2 mb-4 w-full">
                    All Candidates
                </h2>

                {users.length === 0 ? (
                    <p className="text-center text-gray-300 py-8">
                        No candidates found.
                    </p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[75vh] overflow-y-auto scrollbar-none">
                        {users.map((user, ind) => (
                            <li
                                className="bg-gray-900 p-4 rounded-[1rem] shadow-md hover:shadow-2xl transition-all flex flex-col gap-1"
                                key={user._id || user.empID || ind}
                            >
                                <p className="font-semibold text-blue-400">
                                    ID: {user.empID}
                                </p>

                                <p className="text-lg font-medium">
                                    {user.name}
                                </p>

                                <p className="text-sm text-gray-400">
                                    Role: {user.role}
                                </p>

                                <p className="text-sm text-gray-300">
                                    Phone: {user.pNumber}
                                </p>

                                <p className="text-sm text-gray-300 break-words">
                                    Email: {user.email}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
