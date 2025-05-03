import prisma from "@/lib/prisma";

export default async function Page() {
    async function getSkill() {
        "use server";
        const res = await prisma.skill.findMany();
        return res;
    }
    const skills = await getSkill();
    return (
        <>
        <div className="skills">
        {skills.map((skill) => (
            <div key={skill.id} className="skill">
                <h2>{skill.name}</h2>
                <p>{skill.description}</p>
            </div>
        ))}
        </div>
        </>
    )
}