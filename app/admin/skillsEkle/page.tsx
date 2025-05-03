
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import Crypto from "crypto";

export default async function Skills() {

    const cookieStore = await cookies();
    const adminToken1 = cookieStore.get('admin-token');

    if (!adminToken1) {
      return <div>Admin token not found</div>;
    }

    // Admin token'ı doğrulamak için hash oluşturuluyor
    const deger = Crypto.createHash("sha256");
    deger.update("adminBasarili");  // Buradaki 'adminBasarili' yerine gerçek token kullanmanız gerekebilir.
    const adminToken = deger.digest("hex");

    // Admin token'ları karşılaştırıyoruz
    if (adminToken1.value !== adminToken) {
      return <div>Admin token is invalid</div>;
    }

    // Skill ekleme fonksiyonu
    async function addSkill(formData: FormData) {
        "use server";
        const userData = {
            name: formData.get("skillName") as string,
            description: formData.get("skillD") as string,
            image: "a", // Burada file yükleme için bir işlem eklemelisiniz
        };

        // Skill verisini ekliyoruz
        await prisma.skill.create({
            data: userData,
        });
    }

  return (
    <div>
      <form action={addSkill} className="skillsForm">
        <label htmlFor="skillName">Skill Name</label>
        <input
          type="text"
          name="skillName"
          placeholder="Skill Name"
          required
        />
        <label htmlFor="skillD">Skill Description</label>
        <textarea
          name="skillD"
          id="skillD"
          cols={30}
          rows={10}
          placeholder="Skill Description"
          required
        />
        <label htmlFor="skillImage">Skill Image</label>
        <input type="file" name="skillImage" id="skillImage" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
