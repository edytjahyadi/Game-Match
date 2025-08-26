import React from 'react';
import InfoIcon from './icons/InfoIcon';

const DemoModeBanner: React.FC = () => {
  return (
    <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl text-center bg-yellow-100/80 backdrop-blur-sm p-3 rounded-xl shadow-md border border-yellow-200">
      <div className="flex items-center justify-center gap-3">
        <InfoIcon className="w-6 h-6 text-yellow-700 flex-shrink-0" />
        <p className="text-sm font-semibold text-yellow-800">
          <strong>Demo Mode:</strong> Playing with sample content. Set up an API key for new challenges!
        </p>
      </div>
    </div>
  );
};

export default DemoModeBanner;
