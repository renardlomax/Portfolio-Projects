'use client';

import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl text-center p-8 bg-white shadow-md rounded-lg  ">
        <h1 className="text-3xl font-bold mb-4 bg-blue-500">About Me</h1>
        <p className="text-gray-600 text-left">   
        </p>
        <ul className="list-disc list-inside text-left text-gray-700">
          <li>LEAD GEN</li>
          <li>Worked with React, Node.js, and MongoDB</li>
          <li>Passionate about UI/UX design</li>
        </ul>
        
      </div> 
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">Projects</h1>
      <p className="mb-10 text-gray-600 text-center max-w-xl">
        Here are some of my featured development projects:
      </p>

      <div className="flex flex-row gap-6 overflow-x-auto w-full max-w-6xl px-4">
         <ProjectCard
          title="LEAD GeN"
          description="Mini storefront with shopping cart and product catalog."
          tech="Next.js, MongoDB"
          image="/images/ecommerce.png"
        />
        
       
      </div>
    </main>
  );
}
