import dynamic from "next/dynamic";
import components from "./componentRegistery";

export default function DynamicComponent({ element, content }) {
    const ComponentToRender = components[element.toLowerCase()];
  
    if (!ComponentToRender) {
      return <div>Component "{element}" not found</div>;
    }
 
    
    const DynamicComponentToRender = dynamic(() => Promise.resolve(ComponentToRender));

    return <DynamicComponentToRender content={content} />;
  }