    
import prisma from "@/lib/prisma";

export default function Skills() {
    
    async function addSkill(formData: FormData) {
        "use server";
        const userData = {
            name: formData.get("skillName") as string,
            description: formData.get("skillD") as string,
            image: "a",
        };
        await prisma.skill.create({
            data: userData,
        })
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
