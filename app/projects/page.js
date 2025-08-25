'use client';

import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">Projects</h1>
      <p className="mb-10 text-gray-600 text-center max-w-xl">
        Here are some of my featured development projects:
      </p>

      <div className="flex flex-row gap-6 overflow-x-auto w-full max-w-6xl px-4">
        <ProjectCard
          title="Feedback Collector App"
          description="Collect user ratings and feedback with a full-stack form workflow."
          tech="React, Node.js, MongoDB"
          image="/images/feedback.png"
        />

        <ProjectCard
          title="E-commerce Lite"
          description="Mini storefront with shopping cart and product catalog."
          tech="Next.js, MongoDB"
          image="/images/ecommerce.png"
        />

        <ProjectCard
          title="Real-Time Chat"
          description="Group messaging with instant updates."
          tech="React, Socket.io, Express"
          image="/images/chat.png"
        />
      </div>
    </main>
  );
}
