"use client";
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import InputAnimation from '../common/input/InputAnimation';
import Image from 'next/image';
import user_icon from '@public/images/common/auth-icon.svg';
import mail_icon from '@public/images/common/mail-icon2.svg';
import object_icon from '@public/images/common/object-icon.svg';
import textarea_icon from '@public/images/common/textarea-icon.svg';
import {sendContactFormLJI} from "@lib/Contact/type/ContactType";
import ValidationPopup from "@/components/utils/décors/ValidationPopUp";

function RightSection() {
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        objet: "",
        consent: false,
    });
    const [status, setStatus] = useState<string>("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 803);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;
        if (type === "checkbox") {
            const {checked} = e.target as HTMLInputElement;
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
            if (name === "consent" && checked) {
                setShowPopup(true);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("Sending");
        try {
            const data = await sendContactFormLJI(formData);
            if (data.success) {
                setStatus("Message envoyé !");
                setFormData({name: "", email: "", message: "", objet: "", consent: false});
            } else {
                setStatus("Problème lors de l'envoi du mail");
            }
        } catch (error) {
            setStatus("Erreur lors de l'envoi du formulaire");
        }
    };

    return (
        <div
            className={`border-2 border-black max-w-[600px] flex flex-col items-start justify-center p-4 h-auto md:h-[500px] ${isMobile ? 'text-sm w-11/12' : 'text-base w-full'}`}>
            <h3 className={`font-bold mt-6 mb-8 w-full ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
                Contactez-nous
            </h3>
            <form onSubmit={handleSubmit} className="w-full">
                <div
                    className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-4 md:space-y-0">
                    <div className='w-full md:w-[48%] flex items-center'>
                        <InputAnimation
                            label='Nom'
                            icon={user_icon}
                            utility='text'
                            type="text"
                            name="name"
                            placeholder="Entrez votre nom prénom"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full md:w-[48%] flex items-center'>
                        <InputAnimation
                            label='Adresse mail'
                            icon={mail_icon}
                            utility='text'
                            type="email"
                            name="email"
                            placeholder="Entrez votre email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-full mb-6">
                    <InputAnimation
                        label='Objet'
                        icon={object_icon}
                        utility='text'
                        type='text'
                        name={'objet'}
                        value={formData.objet}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full h-40 bg-[#F5F5F5] flex items-center mb-2 border-gray-200 border rounded-md'>
                    <textarea
                        className='w-11/12 h-full p-4 bg-[#F5F5F5] resize-none outline-none'
                        name="message"
                        placeholder="Entrez votre message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <span className='w-1/12 h-full flex items-center justify-center bg-[#F5F5F5]'>
                        <Image src={textarea_icon} alt='textarea_icon' className='w-6 h-6'/>
                    </span>
                </div>
                <div className={"mb-5"}>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mr-2"
                        required
                    />
                    <label className="text-black">J&apos;accepte la politique de confidentialité</label>
                </div>
                <button type="submit"
                        className='w-full bg-[#A00C30] text-white focus:outline-none py-2 rounded-md hover:bg-black mb-4'>
                    Envoyer
                </button>
            </form>
            {showPopup && (
                <ValidationPopup
                    title="Le consentement lors d'un envoi"
                    text="Si vous voulez en savoir plus."
                    link='privacy'
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
}

export default RightSection;
