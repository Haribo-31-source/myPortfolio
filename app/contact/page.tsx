"use client";

import axios from "axios";
import {motion} from "framer-motion"
import { useState } from "react";

type Contact = {
    success: boolean;
}

export default function Page() {
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    async function newMessage(formData: FormData) {
        const userData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: formData.get("message") as string,
        };

        const res = await axios.post<Contact>("/contact/addMsg", {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            message: userData.message
        });
        if (res.data.success === true) setIsSuccess(true);
        else if (res.data.success === false) setIsSuccess(false);
    }
    return (
        <>
            <h1>İletişim Formu</h1>
            <motion.form 
            initial={{opacity:0}} animate={{opacity:1}}
            action={newMessage} className="contactForm">
                <label htmlFor="name">İsim:</label>
                <input type="text" id="name" name="name" placeholder="Adınızı giriniz" required></input>
                <label htmlFor="email">E-Posta:</label>
                <input type="email" id="email" name="email" placeholder="E-posta adresinizi giriniz" required></input>
                <label htmlFor="phone">Tel-no:</label>
                <input type="phone" id="phone" name="phone" placeholder="E-posta adresinizi giriniz" required></input>
                <label htmlFor="message">Mesaj:</label>
                <textarea id="message" name="message" placeholder="Mesajınızı giriniz" required></textarea>
                <button type="submit">Gönder</button>
                {isSuccess && <p>Mesajınız gönderildi.</p>}
                {isSuccess === false && <p>Hata oluştu. Lütfen tekrar deneyiniz.</p>}
            </motion.form></>
    )
}