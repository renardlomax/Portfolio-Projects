const ProjectCard = ({ title, description, tech, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-1">{description}</p>
      <p className="text-sm text-gray-500">{tech}</p>
    </div>
  );
}

export default ProjectCard