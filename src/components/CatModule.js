import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatModule = () => {
  const [fullResponse, setFullResponse] = useState(null);
  const apiKey = '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';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Build the prompt string
        const prompt = `We are analysing the impact 
          of government policies on drop out rates of obc, sc, st and general category students. List three policies of gujrat govenrnment that have helped in reducing the drop out rates of backward students, and their impact with statistics. Give answer in past tense.`;

        // Call OpenAI API
        const response = await callOpenAPI(prompt, apiKey);

        // Set the fullResponse in the state
        setFullResponse(response);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  // Function to call OpenAI API
  const callOpenAPI = async (prompt, apiKey) => {
    const params = {
      prompt: prompt,
      max_tokens: 150,  // Adjust as needed
      temperature: 0.7,  // Adjust as needed
      stop: null  // custom stop words
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', params, { headers: headers });
    return response.data.choices[0].text;
  };

  return (
    <div>
      {/* Render your React component using the fullResponse */}
      <pre className='Response'>{fullResponse}</pre>
    </div>
  );
};

export default CatModule;
