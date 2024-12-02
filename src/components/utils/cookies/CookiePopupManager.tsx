'use client';

import React, { useState, useEffect } from 'react';
import CookiePopup from './CookiePopup';

const CookiePopupManager: React.FC = () => {
    const [isCookiePopupOpen, setCookiePopupOpen] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setCookiePopupOpen(true);
        }
    }, []);

    const closeCookiePopup = (consentGiven: boolean) => {
        if (consentGiven) {
            localStorage.setItem('cookieConsent', 'accepted');
        } else {
            localStorage.setItem('cookieConsent', 'declined');
        }
        setCookiePopupOpen(false);
    };

    return (
        <>
            {isCookiePopupOpen && (
                <CookiePopup
                    isOpen={isCookiePopupOpen}
                    onClose={() => closeCookiePopup(true)}
                />
            )}
        </>
    );
};

export default CookiePopupManager;
