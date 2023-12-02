import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './timeline.css';
import './timeline1.css';

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const calculateStepWidth = () => {
    return (activeStep / (steps.length - 1)) * 100 + '%';
  };

  const steps = [
    'Intro',
    'array',
    'matrix',
    'string',
    'search and sort',
    'linked list',
    'Binary trees',
    'bst',
    'greedy',
    'backtracking',
    'stacks and queues',
    'heap',
    'graph',
    'trie',
    'dynamic programming',
    'bit manipulation',
  ];

  const links = [
    'https://www.javatpoint.com/data-structure-introduction',
    'https://www.javatpoint.com/data-structure-array',
    'https://www.javatpoint.com/sparse-matrix',
    'https://www.javatpoint.com/python-strings',
    'https://www.javatpoint.com/linear-search',
    'https://www.javatpoint.com/binary-search',
    'https://www.javatpoint.com/bubble-sort',
    'https://www.javatpoint.com/heap-sort',
    'https://www.javatpoint.com/insertion-sort',
    'https://www.javatpoint.com/merge-sort',
    'https://www.javatpoint.com/radix-sort',
    'https://www.javatpoint.com/quick-sort',
    'https://www.javatpoint.com/selection-sort',
    'https://www.javatpoint.com/ds-linked-list',
    'https://www.javatpoint.com/binary-tree',
    'https://www.javatpoint.com/binary-search-tree',
    'https://www.javatpoint.com/greedy-algorithms',
    'https://www.javatpoint.com/backtracking-introduction',
    'https://www.javatpoint.com/data-structure-stack',
    'https://www.javatpoint.com/data-structure-queue',
    'https://www.javatpoint.com/heap-data-structure',
    'https://www.javatpoint.com/ds-graph',
    'https://www.javatpoint.com/trie-data-structure',
    'https://www.javatpoint.com/dynamic-programming',
    'https://www.javatpoint.com/bit-manipulation-cpp',
  ];

  return (
    <div>
      <h1>DSA TOPICS</h1>
      <br />
      {/* Import ionicons directly in your project or use a React component if available */}
      <div className="process-wrapper">
        <div id="progress-bar-container">
          <ul>
            {steps.map((step, index) => (
              <li
                key={index}
                className={`step step0${index + 1} ${activeStep >= index ? 'active' : ''}`}
                onClick={() => handleStepClick(index)}
              >
                <div className="step-inner">{step}</div>
              </li>
            ))}
          </ul>
          <div id="line">
            <div id="line-progress" style={{ width: calculateStepWidth() }}></div>
          </div>
        </div>
        <div id="progress-content-section">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`section-content step${index + 1} ${activeStep === index ? 'active' : ''}`}
            >
              <h2>{`Introduction to ${step}`}</h2>
              <a href={links[index]}>{step}</a>
              <ion-icon name="newspaper-outline"></ion-icon>
              <h2>Youtube link for reference</h2>
              <a href={links[index]}></a>
              <ion-icon name="logo-youtube"></ion-icon>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
