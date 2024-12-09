import React from 'react';
import DynamicComponent from '../DynamicComponent';

const Node = ({ 
  title, 
  type,
  created, 
  body, 
  image, 
  sections,
  content 
}) => {
  const nodeTitle = content?.title || title;
  const nodeBody = content?.body || body;
  const nodeImage = content?.image || image;
  const nodeSections = content?.sections || sections;

  return (
    <div className="node">
      {nodeTitle && <h2>Node: {nodeTitle}</h2>}
      
      {nodeImage && (
        <div dangerouslySetInnerHTML={{ __html: nodeImage.content }} />
      )}
      
      {nodeBody && (
        <div className="prose max-w-none [&_a]:text-blue-600" dangerouslySetInnerHTML={{ 
          __html: Array.isArray(nodeBody) ? nodeBody.join('') : nodeBody 
        }} />
      )}
      
      {nodeSections && (
        <div>
          <DynamicComponent 
            element={nodeSections.content?.element} 
            content={nodeSections.content} 
          />
        </div>
      )}
    </div>
  );
};

export default Node;