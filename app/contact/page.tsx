import prisma from "@/lib/prisma";

export default function Page() {
    async function newMessage(FormData: FormData) {
        "use server";
        const userData = {
            name: FormData.get("name") as string,
            email: FormData.get("email") as string,
            phone: FormData.get("phone") as string,
            message: FormData.get("message") as string,
        };

        await prisma.contact.create({
            data: userData,
        });
    }
    return (
        <>
            <h1>İletişim Formu</h1>
            <form action={newMessage} className="contactForm">
                <label htmlFor="name">İsim:</label>
                <input type="text" id="name" name="name" placeholder="Adınızı giriniz" required></input>
                <label htmlFor="email">E-Posta:</label>
                <input type="email" id="email" name="email" placeholder="E-posta adresinizi giriniz" required></input>
                <label htmlFor="phone">Tel-no:</label>
                <input type="phone" id="phone" name="phone" placeholder="E-posta adresinizi giriniz" required></input>
                <label htmlFor="message">Mesaj:</label>
                <textarea id="message" name="message" placeholder="Mesajınızı giriniz" required></textarea>
                <button type="submit">Gönder</button>

            </form></>
    )
}