
const About = () => {
  return (
    <div className="container py-16 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Influencify is a powerful platform designed for content creators and influencers to monetize their online presence through a customizable link-in-bio solution.
        </p>
        <p className="text-lg mb-6">
          Our mission is to empower creators by providing them with the tools they need to connect with their audience and generate revenue from their content across multiple platforms.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
        <p className="text-lg mb-6">
          Founded in 2023, Influencify was born from the realization that creators needed a better way to showcase their content, products, and services in one centralized location. We understand the challenges that creators face in the fragmented social media landscape and have built a solution that bridges these gaps.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li className="text-lg">Creator-First Approach: Everything we build is designed with creators' needs in mind.</li>
          <li className="text-lg">Simplicity: We believe powerful tools should be easy to use.</li>
          <li className="text-lg">Innovation: We're constantly evolving our platform to keep up with the changing digital landscape.</li>
          <li className="text-lg">Community: We foster a supportive environment for creators to connect and grow together.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">The Team</h2>
        <p className="text-lg">
          Our team consists of passionate individuals from diverse backgrounds in technology, design, and creator economy. We're united by our commitment to building tools that help creators succeed in the digital age.
        </p>
      </div>
    </div>
  );
};

export default About;
