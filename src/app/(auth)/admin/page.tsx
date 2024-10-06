"use client";

import { useRouter } from "next/navigation";
import BubbleBackground from "@/components/utils/décors/BubbleBackground";
import { FaGraduationCap, FaFileContract, FaUser, FaCommentDots } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const AdminPage: React.FC = () => {
    const router = useRouter();

    const handleProfessions = () => {
        router.push("/admin/profession");
    };

    const handleContrats = () => {
        router.push("/admin/product");
    };

    const handleComptes = () => {
        router.push("/admin/users");
    };

    const handleCommentaires = () => {
        router.push("/admin/testimonials");
    };

    return (
        <main className="relative flex text-center items-center justify-center min-h-screen w-full">
            <div className="m-5 mt-20 mb-10 relative z-10 w-full px-6 py-10 md:px-10 md:py-20 rounded-xl flex flex-col items-center">
                <h1 className={"text-6xl font-bold p-10"}>Bienvenue sur la page administrateur</h1>
                <div className="flex flex-col space-y-4 w-full">
                    <button
                        onClick={handleProfessions}
                        className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <FaGraduationCap className="text-3xl" />
                            <div className="text-left">
                                <p className="text-lg font-semibold">Professions</p>
                                <p className="text-sm text-gray-600">14 disponibles, 2 masquées</p>
                            </div>
                        </div>
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                    <button
                        onClick={handleContrats}
                        className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <FaFileContract className="text-3xl" />
                            <div className="text-left">
                                <p className="text-lg font-semibold">Contrats</p>
                                <p className="text-sm text-gray-600">27 disponibles, 14 réservés</p>
                            </div>
                        </div>
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                    <button
                        onClick={handleComptes}
                        className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <FaUser className="text-3xl" />
                            <div className="text-left">
                                <p className="text-lg font-semibold">Comptes</p>
                                <p className="text-sm text-gray-600">48 actifs, 2 en attente, 1 désactivé</p>
                            </div>
                        </div>
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                    <button
                        onClick={handleCommentaires}
                        className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <FaCommentDots className="text-3xl" />
                            <div className="text-left">
                                <p className="text-lg font-semibold">Commentaires</p>
                                <p className="text-sm text-gray-600">154 postés, 17 suspects</p>
                            </div>
                        </div>
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                </div>
            </div>
            <BubbleBackground size={400} position={"-left-16 -bottom-16"} />
            <BubbleBackground size={300} position={"-right-16 -bottom-16"} />
        </main>
    );
};

export default AdminPage;
