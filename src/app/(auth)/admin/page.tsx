"use client";

import { useRouter } from "next/navigation";
import { FaGraduationCap, FaFileContract, FaUser, FaCommentDots } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { getAllProfessions } from "@lib/ProfessionLib/service/professionService";
import { fetchProductsForAdmin } from "@lib/ProductLib/service/produit";
import { ProductDetail } from "@lib/ProductLib/type/Product";
import { getTestimonials } from "@lib/testimonialLib/service/testimonials";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommentaireDocument } from "@lib/testimonialLib/type/Testimonial";
import { Profession } from "@lib/ProfessionLib/type/Profession";



interface User {
    _id: string;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    isAdmin: boolean;
    dateOfBirth: string;
    isVerified: boolean;
    createdAt: string;
    cart?: string;
}

const AdminPage: React.FC = () => {
    const router = useRouter();
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [testimonials, setTestimonials] = useState<CommentaireDocument[]>([]);

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

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductsForAdmin();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };


        const loadProfessions = async () => {
            try {
                const data = await getAllProfessions();
                setProfessions(data);
            } catch (error) {
                console.error("Error fetching professions:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/user");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchTestimonials = async () => {
            try {
                const data = await getTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };

        loadProducts();
        loadProfessions();
        fetchUsers();
        fetchTestimonials();
    }, []);


    return (
        <main className="relative flex text-center items-center justify-center min-h-screen w-full z-20">
            <div className="m-5 mt-20 mb-10 relative  w-full px-6 py-10 md:px-10 md:py-20 rounded-xl z-20 flex flex-col items-center">
                <h2 className="text-3xl md:text-6xl font-bold p-5 md:p-10 text-center">Bienvenue sur la page administrateur</h2>
                <div className="flex flex-col space-y-4 w-full">
                    <button
                        onClick={handleProfessions}
                        className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <FaGraduationCap className="text-3xl" />
                            <div className="text-left">
                                <p className="text-lg font-semibold">Professions</p>
                                <p className="text-sm text-gray-600">{professions.length + " "}
                                    disponible
                                    {professions.length > 1 ? "s" : ""}
                                </p>
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
                                <p className="text-sm text-gray-600">
                                    {products.length + " "}
                                    disponible{products.length > 1 ? "s" : ""}
                                </p>
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
                                <p className="text-sm text-gray-600">
                                    {users.length} utilisateur{users.length > 1 ? "s" : ""}, {''}
                                    {users.filter(user => user.isVerified).length + " "}vérifié{users.length > 1 ? "s" : ""}, {" "}
                                    {users.filter(user => !user.isVerified).length + " "} non vérifié{users.length > 1 ? "s" : ""}
                                </p>
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
                                <p className="text-sm text-gray-600">
                                    {testimonials.length + " "} posté{testimonials.length > 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default AdminPage;
