"use client";
import { useEffect, useState, type ChangeEvent } from "react";
import axios from 'axios';
import { postImage } from "@/lib/addSkill";

type CheckAdminResponse = {
  authorized: boolean;
};



export default function Skills() {
  const [file, setFile] = useState<File | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkAdminError, setCheckAdminError] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const response = await axios.post<CheckAdminResponse>(
          '/admin/api/checkAdmin',
          {},
          { withCredentials: true },
        );
        setIsAdmin(response.data.authorized);
      } catch (error: unknown) {
        console.error("Admin yetkisi kontrol edilemedi:", error);
        setCheckAdminError(true);
      }
    }

    void checkAdmin();
  }, []);

  // Bu fonksiyon seçilen dosyayı file değişkenine atar
  
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  }

  // Bu fonksiyon dosyayı apiye gönderir ve dönen urlyi imageUrl değişkenine atar

  async function addSkill(formData: FormData) {  
    await axios.post('/admin/api/addSkill', {
      name: formData.get("skillName") as string,
      description: formData.get("skillD") as string,
      image: await postImage(file!)
    });
  
  }

  if (checkAdminError) {
    return <div role="alert">Admin yetkisi kontrol edilemedi. Lütfen daha sonra tekrar deneyin.</div>;
  }
  if (isAdmin === null) return <div>Loading...</div>;
  if (!isAdmin) return <div>Admin yetkiniz yok. Giriş gerekli.</div>;

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
        <input type="file" name="skillImage" id="skillImage" accept="image/png" onChange={uploadImage} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
