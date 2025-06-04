import prisma from "@/lib/prisma";

export async function GET(){
    const skills = await prisma.skill.findMany();
    return new Response(JSON.stringify(skills), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}