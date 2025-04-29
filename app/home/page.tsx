import Image from "next/image"

export default function Home() {
  return (
    <>
    <div className="container">
<main>
        <div className="texts">
        <h1>Hello , I'm İbrahim</h1>
        <h4>I'm a design and coding enthusiast who specializes in backend development. While my main focus is backend, I also have a solid understanding of frontend.</h4>
    </div>
        <div className="frbc">
            <div className="frontEnd">
                <Image src="/frontend.png" alt="FrontEnd" width={1000} height={1000}></Image>
                <p>I'm a design and coding enthusiast who specializes in backend development, but I believe great frontend is what brings the soul to an application. I enjoy crafting intuitive, responsive, and visually engaging interfaces that turn ideas into seamless user experiences</p>
            </div>
            <div className="backend">
            <Image src="/backend.png" alt="BackEnd" width={1000} height={1000}></Image>
                <p>I'm a design and coding enthusiast with a strong focus on backend development. I love building robust, scalable, and secure systems that power seamless digital experiences behind the scenes.</p>
            </div>
        </div>
    </main>
    </div>
    </>
  )
}