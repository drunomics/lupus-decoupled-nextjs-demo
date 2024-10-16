import dynamic from "next/dynamic";

const components = {
    node: dynamic(() => import('./Node')),
    'node-article-full': dynamic(() => import('./NodeArticleFull')),
    'layout-section': dynamic(() => import('./LayoutSection')),
    'teaser-list': dynamic(() => import('./TeaserList')),
};

export default function DynamicComponent({ element, content }) {
    const ComponentToRender = components[element];
  
    if (!ComponentToRender) {
      return <div>Component "{element}" not found</div>;
    }
  
    return <ComponentToRender content={content} />;
  }