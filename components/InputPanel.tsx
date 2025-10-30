
import React, { useCallback } from 'react';
import { ImageIcon, TrashIcon } from './icons';

interface InputPanelProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  features: string;
  onFeaturesChange: (value: string) => void;
  audience: string;
  onAudienceChange: (value: string) => void;
  onClear: () => void;
}

const Panel: React.FC<{ title: string; step: number; children: React.ReactNode }> = ({ title, step, children }) => (
    <div className="mb-6">
        <h2 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            <span className="bg-primary text-white rounded-full h-6 w-6 inline-flex items-center justify-center text-sm mr-2">{step}</span>
            {title}
        </h2>
        {children}
    </div>
);


export const InputPanel: React.FC<InputPanelProps> = ({
  imagePreview,
  onImageChange,
  features,
  onFeaturesChange,
  audience,
  onAudienceChange,
  onClear,
}) => {
    
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageChange(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageChange(event.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-light-frame dark:bg-dark-frame p-6 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Details</h2>
        <button onClick={onClear} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
            <TrashIcon /> Clear
        </button>
      </div>

      <Panel title="Product Image" step={1}>
        <label
          htmlFor="file-upload"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`mt-1 flex justify-center items-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
            imagePreview ? 'border-primary' : 'border-gray-300 dark:border-gray-600 hover:border-primary'
          }`}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Product preview" className="max-h-full max-w-full object-contain rounded-md" />
          ) : (
            <div className="space-y-1 text-center">
              <ImageIcon />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-primary">Upload a file</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
        </label>
      </Panel>

      <Panel title="Key Product Features" step={2}>
        <textarea
          rows={5}
          className="w-full p-3 bg-light-input-bg dark:bg-dark-input-bg rounded-md border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          placeholder="One feature per line..."
          value={features}
          onChange={(e) => onFeaturesChange(e.target.value)}
        />
      </Panel>

      <Panel title="Target Audience & Tone" step={3}>
        <input
          type="text"
          className="w-full p-3 h-12 bg-light-input-bg dark:bg-dark-input-bg rounded-md border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          placeholder="e.g., Environmentally conscious millennials"
          value={audience}
          onChange={(e) => onAudienceChange(e.target.value)}
        />
      </Panel>
    </div>
  );
};
