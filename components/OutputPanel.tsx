import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { CopyIcon, CheckIcon, MagicWandIcon } from './icons';

interface OutputPanelProps {
  description: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
        <MagicWandIcon />
        <h3 className="mt-4 text-xl font-semibold">Your AI-Generated Description Will Appear Here</h3>
        <p className="mt-1 text-sm">Fill in the product details and click "Generate" to see the magic happen!</p>
    </div>
);


export const OutputPanel: React.FC<OutputPanelProps> = ({ description, isLoading, error }) => {
  const [copied, setCopied] = useState(false);
  const [safeHtml, setSafeHtml] = useState('');

  useEffect(() => {
    if (description) {
      (async () => {
        const rawHtml = await marked.parse(description);
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        setSafeHtml(cleanHtml);
      })();
    } else {
      setSafeHtml('');
    }
  }, [description]);

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-light-frame dark:bg-dark-frame p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Generated Description</h2>
        {description && !isLoading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      <div className="flex-grow bg-light-bg dark:bg-dark-bg p-4 rounded-lg min-h-[400px] prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-light-text dark:prose-headings:text-dark-text prose-p:text-light-text dark:prose-p:text-dark-text">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-red-500 bg-red-500/10 p-4 rounded-md">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        ) : description ? (
            <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};
