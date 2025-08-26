import React from 'react';

const ApiKeyError: React.FC = () => {
  return (
    <div className="text-center bg-red-100/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-2xl mx-auto border-2 border-red-200">
      <h2 className="text-4xl font-extrabold text-red-700 mb-4">Configuration Error</h2>
      <p className="text-red-600 mb-6 text-lg">
        The application could not start because the Gemini API key is missing.
      </p>
      <div className="text-left bg-white/70 p-4 rounded-lg text-slate-700">
        <p className="font-bold mb-2">If you are the developer:</p>
        {/* fix: Updated instructions to use API_KEY instead of VITE_API_KEY as per guidelines. */}
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Please ensure you have set up an <code>API_KEY</code> environment variable in your deployment service (e.g., Vercel, Netlify).
          </li>
          <li>
            The variable name must be exactly <code>API_KEY</code>.
          </li>
          <li>
            After adding the key, you may need to redeploy the application.
          </li>
        </ol>
      </div>
       <p className="text-slate-500 mt-6 text-sm">
        This game requires a valid API key to generate new and exciting content for every session.
      </p>
    </div>
  );
};

export default ApiKeyError;