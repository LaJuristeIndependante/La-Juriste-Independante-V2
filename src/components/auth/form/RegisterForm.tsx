import React, { useEffect, useState, ChangeEvent } from 'react';
import InputAnimation from '../../common/input/InputAnimation';
import PasswordAnimation from '../../common/input/PasswordAnimation';
import { register } from '@/../_lib/UserLib/actions/register';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import lock_icon from '@public/images/auth/lock-icon.svg';
import email_icon from '@public/images/auth/email-icon.svg';
import google_icon from '@public/images/auth/google-icon.svg';
import apple_icon from '@public/images/auth/apple-icon.svg';
import disqus_icon from '@public/images/auth/disqus-icon.svg';
import people_id_icon from '@public/images/auth/people-id-icon.svg';

interface RegisterFormProps {
    handleOnLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ handleOnLoginClick }) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const data = {
        username,
        email,
        password,
        nom: lastName,
        prenom: firstName,
        dateOfBirth, // Include dateOfBirth
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await register(data);
            console.log('Réponse:', response);
            if (response?.error) {
                setErrorMessage(response.error);
            } else {
                router.push('/');
            }
        } catch (error: any) {
            console.error('Erreur lors de l’inscription:', error);
            if (error.response && error.response.status === 400) {
                setErrorMessage("L'utilisateur existe déjà. Veuillez vous connecter.");
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('Non autorisé. Veuillez vérifier vos informations.');
            } else {
                setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
            }
        }
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
    };

    return (
        <div className='RegisterForm flex flex-col justify-center items-center'>
            <h1 className='font-semibold text-2xl mb-4 ml-3 mt-6'>S&apos;inscrire</h1>
            <p className='text-sm ml-3 mb-3'>
                Inscrivez-vous pour partager vos impressions avec les autres clients, centraliser vos contrats, et plus encore !
            </p>
            <form className='w-full max-w-md' onSubmit={handleSubmit}>
                <div className={`scrollable-inputs mb-2 ${screenHeight < 900 ? 'max-h-60 overflow-y-scroll' : ''}`}>
                    <div className="mt-5"></div>
                    <InputAnimation
                        icon={people_id_icon}
                        utility='firstName'
                        type='text'
                        label='Prénom'
                        value={firstName}
                        onChange={handleChange(setFirstName)}
                        name='firstName'
                    />
                    <InputAnimation
                        icon={people_id_icon}
                        utility='lastName'
                        type='text'
                        label='Nom de famille'
                        value={lastName}
                        onChange={handleChange(setLastName)}
                        name='lastName'
                    />
                    <InputAnimation
                        icon={people_id_icon}
                        utility='username'
                        type='text'
                        label="Identifiant"
                        value={username}
                        onChange={handleChange(setUsername)}
                        name='username'
                    />
                    <InputAnimation
                        icon={email_icon}
                        utility='email'
                        type='email'
                        label='Email'
                        value={email}
                        onChange={handleChange(setEmail)}
                        name='email'
                    />
                    <InputAnimation
                        icon={people_id_icon}
                        utility='dateOfBirth'
                        type='date'
                        label='Date de naissance'
                        value={dateOfBirth}
                        onChange={handleChange(setDateOfBirth)}
                        name='dateOfBirth'
                    />
                    <PasswordAnimation
                        icon={lock_icon}
                        utilitie='password'
                        type='password'
                        label='Mot de passe'
                        boolean={true}
                        value={password}
                        onChange={handleChange(setPassword)}
                    />
                    <PasswordAnimation
                        icon={lock_icon}
                        utilitie='confirmPassword'
                        type='password'
                        label='Vérification du mot de passe'
                        boolean={false}
                        value={confirmPassword}
                        onChange={handleChange(setConfirmPassword)}
                    />
                </div>
                <div className="sideBar_logged-section_user-actions flex items-center justify-center w-full mt-3">
                    {errorMessage && <p className='text-red-500 mt-2 text-center mb-4'>{errorMessage}</p>}
                    <button className="text-white bg-black w-11/12 p-2 hover:bg-gray-800 mt-1 rounded-lg" type='submit'>
                        S&apos;inscrire
                    </button>
                    <button className="sideBar_logged-section_googleConnexionButton rounded-full ml-2 w-11 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200">
                            <Image src={google_icon} alt="google icon" width={24} height={24} className="w-6 h-6" />
                    </button>
                </div>
            </form>
            <div className="sideBar_logged-section_noAccount mt-4">
                <p className='text-center text-sm'>
                    Déjà inscrit?{' '}
                    <button
                        className="text-xs mt-3 text-blue-400 list-underlined hover:text-blue-600"
                        onClick={handleOnLoginClick}
                    >
                        Connectez-vous
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
