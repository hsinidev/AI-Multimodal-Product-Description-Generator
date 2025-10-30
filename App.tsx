
import React, { useState, useEffect, useCallback } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { generateDescription } from './services/geminiService';
import useLocalStorage from './hooks/useLocalStorage';
import type { AppSettings } from './types';
import { GenerateIcon } from './components/icons';

const App: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<AppSettings>('ecommerce_settings', {
    features: "Material: 100% Organic Cotton\nColor: Deep Navy Blue\nFit: Athletic, breathable\nBenefit: Lasts 5x longer than standard shirts",
    audience: "Environmentally conscious millennials",
    darkMode: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [features, setFeatures] = useState<string>(settings.features);
  const [audience, setAudience] = useState<string>(settings.audience);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(settings.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setSettings(prev => ({ ...prev, darkMode }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);
  
  const handleSaveSettings = useCallback(() => {
    setSettings(prev => ({...prev, features, audience}));
  }, [features, audience, setSettings]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
        handleSaveSettings();
    }, 1000); 

    return () => clearTimeout(timer);
  }, [features, audience, handleSaveSettings]);

  const handleGenerate = async () => {
    if (!imageFile) {
      setError('Please upload a product image.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedDescription('');

    try {
      const description = await generateDescription(imageFile, features, audience);
      setGeneratedDescription(description);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setGeneratedDescription('');
    setError(null);
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans transition-colors duration-300">
      <Header>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </Header>
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InputPanel
              imagePreview={imagePreview}
              onImageChange={setImageFile}
              features={features}
              onFeaturesChange={setFeatures}
              audience={audience}
              onAudienceChange={setAudience}
              onClear={handleClear}
            />
            <OutputPanel
              description={generatedDescription}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg px-8 py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Description...
                </>
              ) : (
                <>
                  <GenerateIcon />
                  Generate Description
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
        dev by <a href="https://github.com/hsinidev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">hsini mohamed</a>
      </footer>
    </div>
  );
};

export default App;