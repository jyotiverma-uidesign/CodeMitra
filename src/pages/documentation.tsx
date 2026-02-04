import React from "react";

const Documentation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          CodeMitra Documentation
        </h1>

        <p className="text-muted-foreground mb-8">
          Welcome to the CodeMitra documentation. This section provides an
          overview of the platform, its features, architecture, and usage
          guidelines to help users and developers understand the application
          effectively.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            CodeMitra is a modern learning platform designed to help beginners
            and aspiring developers master programming concepts through
            structured courses, roadmaps, and practical resources.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Structured learning paths and courses</li>
            <li>Responsive and user-friendly UI</li>
            <li>Secure routing and navigation</li>
            <li>Modern frontend architecture</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
          <p className="text-muted-foreground text-sm">
            Frontend is built using React, TypeScript, Tailwind CSS, and modern
            component-based architecture to ensure scalability and
            maintainability.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Future Enhancements</h2>
          <p className="text-muted-foreground text-sm">
            Planned improvements include AI-assisted learning, personalized
            dashboards, progress tracking, and enhanced community features.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
