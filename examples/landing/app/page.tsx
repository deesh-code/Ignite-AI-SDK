import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';
import { ActionpackdFooter } from './components/ActionpackdFooter';

interface Example {
  id: string;
  name: string;
  description: string;
  tags: string[];
  stack: string[];
  difficulty: string;
  source: string;
  demo?: string;
  deploy: {
    vercel?: boolean;
    netlify?: boolean;
  };
}

interface Manifest {
  examples: Example[];
}

export default async function ExamplesPage() {
  const manifestPath = path.join(process.cwd(), '..', 'manifest.json');
  const manifestContent = await fs.readFile(manifestPath, 'utf8');
  const { examples } = JSON.parse(manifestContent) as Manifest;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="text-center">
          <h1 className="section-title sm:text-5xl">
            Actionpackd Ignite AI SDK Examples
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our collection of example applications showcasing different features and use cases.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <div
              key={example.id}
              className="card relative group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {example.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    {
                      Beginner: 'bg-green-100 text-green-800',
                      Intermediate: 'bg-yellow-100 text-yellow-800',
                      Advanced: 'bg-red-100 text-red-800',
                    }[example.difficulty]
                  }`}>
                    {example.difficulty}
                  </span>
                </div>
                
                <p className="mt-3 text-sm text-gray-500">
                  {example.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {example.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {example.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <a
                    href={`https://github.com/ActionpackdHQ/Ignite-AI-SDK/tree/main/examples${example.source}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source →
                  </a>
                  {example.demo && (
                    <a
                      href={example.demo}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>

                {(example.deploy.vercel || example.deploy.netlify) && (
                  <div className="mt-6 flex items-center gap-4">
                    {example.deploy.vercel && (
                      <a
                        href={`https://vercel.com/new/clone?repository-url=https://github.com/ActionpackdHQ/Ignite-AI-SDK/tree/main/examples${example.source}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="https://vercel.com/button" alt="Deploy with Vercel" />
                      </a>
                    )}
                    {example.deploy.netlify && (
                      <a
                        href={`https://app.netlify.com/start/deploy?repository=https://github.com/ActionpackdHQ/Ignite-AI-SDK/tree/main/examples${example.source}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ActionpackdFooter />
    </div>
  );
}
