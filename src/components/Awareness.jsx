import React from "react";
import bannerImage from "../assets/awareness-banner.png";


const Awareness = () => (
  <div className="max-w-5xl mx-auto p-6 space-y-8">
    {/* Title */}
    <h1 className="text-3xl font-bold text-center text-blue-700">
      Awareness & Learning
    </h1>

    {/* Fact card */}
    <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
      <p className="text-lg font-semibold">
        🌍 Globally, about <strong>1 in 100 children</strong> are on the autism spectrum (WHO). <br />
           In India, roughly <strong>1 in 68 children</strong> are estimated to have autism.
      </p>
    </div>

          {/* Motivating banner */}
      <div className="rounded-lg shadow overflow-hidden mb-8">


        <img
          src={bannerImage}
          alt="Autism Awareness"
          className="w-full h-auto rounded-lg"
        />


        <div className="bg-gray-100 text-center p-4">
          <p className="text-lg font-bold text-gray-700">Redefine Possible 💙</p>
          <p className="text-sm text-gray-600">
            Together, we can build awareness, acceptance, and support for autism worldwide.
          </p>
        </div>
      </div>

      <div className="bg-green-100 p-6 rounded-lg shadow mb-8">
  <h2 className="text-2xl font-semibold mb-2 text-green-800">🌱💚 Nurturing Every Child’s Potential</h2>
  
  <p className="text-gray-700 leading-relaxed mb-4">
    Children with autism are incredibly unique, with their own special way of seeing and interacting with the world.
    Their journey may present challenges, but it’s also filled with remarkable potential, creativity, and resilience.
    What they need most is patience, understanding, support, and unconditional love.
    Every small milestone they achieve is a powerful testament to their strength, courage, and determination.
  </p>
  
  <p className="text-gray-700 leading-relaxed mb-4">
    Each child’s growth is a beautiful story of discovery and progress, where moments of joy and achievement are celebrated.
    By providing a safe, inclusive, and encouraging environment, we help them explore their passions, develop social skills, and unlock new abilities.
  </p>
  
  <p className="text-gray-700 leading-relaxed">
    By offering support, raising awareness, and fostering inclusive communities, we empower children with autism to grow, thrive, and contribute meaningfully to society.
    Together, we can build a world where every child with autism feels accepted, understood, and celebrated for who they are.
    Let’s stand united in compassion, hope, and love.
  </p>
</div>






      

    {/* Intro line */}
    <p className="text-gray-700 text-lg text-center">
      Autism is a spectrum — each person experiences it differently.  
      Explore these resources to learn more and find support.
    </p>

    {/* Friendly feature highlights */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Explore Our Support Features
      </h2>
      <ul className="space-y-3 text-gray-700 text-lg">
        <li>🧩 Take the <strong>ISAA Autism Test</strong> for early screening insights.</li>
        <li>🤖 Get answers from our <strong>AI Autism Support Assistant</strong>.</li>
        <li>💡 Discover <strong>Therapy Suggestions</strong> backed by expert resources.</li>
        <li>🎥 Watch <strong>educational videos</strong> to spread awareness and knowledge.</li>
      </ul>
    </div>

    {/* Video Grid */}
    <h2 className="text-2xl font-semibold text-blue-600">Watch & Learn</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <iframe src="https://www.youtube.com/embed/J0NVikQsNL0" title="Autism Education" width="100%" height="200" frameBorder="0" allowFullScreen></iframe>
      <iframe src="https://www.youtube.com/embed/hwaaphuStxY" title="Expert Overview of Autism" width="100%" height="200" frameBorder="0" allowFullScreen></iframe>
      <iframe src="https://www.youtube.com/embed/ZzrK_KxsoCo" title="General Autism Awareness" width="100%" height="200" frameBorder="0" allowFullScreen></iframe>
    </div>

    {/* Resources */}
    <h2 className="text-2xl font-semibold">Trusted Resources</h2>
    <ul className="list-disc pl-6 space-y-2 text-blue-600">
      <li><a href="https://www.autismspeaks.org/" target="_blank" rel="noreferrer">Autism Speaks</a></li>
      <li><a href="https://www.cdc.gov/ncbddd/autism/index.html" target="_blank" rel="noreferrer">CDC – Autism Spectrum Disorder (ASD)</a></li>
      <li><a href="https://www.autism.org.uk" target="_blank" rel="noreferrer">National Autistic Society</a></li>
    </ul>
  </div>
);

export default Awareness;
