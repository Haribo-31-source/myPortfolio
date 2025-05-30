"use client";
import { useState } from "react";
import { ChangeEvent } from 'react';
import axios from 'axios';
import { postImage } from "@/lib/addSkill";

type CheckAdminResponse = {
  authorized: boolean;
};



export default function Skills() {
  const [file, setFile] = useState<File | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  //Admin Giriş Token Kontrolü

  async function checkAdmin() {
    const response = await axios.post<CheckAdminResponse>('/admin/api/checkAdmin', {}, { withCredentials: true });
    if (response.data.authorized) {
      console.log("Admin Giriş Yapıldı");
      setIsAdmin(true);
    } else {
      console.log("Admin Giriş Yapılmadı");
      setIsAdmin(false);
    }
  }

  checkAdmin();

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
