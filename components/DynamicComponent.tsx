import dynamic from "next/dynamic";
import components from "./componentRegistery";

type DynamicComponentProps = {
    element: string;
    content: { [key: string]: any };
}

export default function DynamicComponent({ element, content }: DynamicComponentProps) {
    const ComponentToRender = components[element.toLowerCase()];
  
    if (!ComponentToRender) {
        return <div>Component "{element}" not found</div>;
    }
 
    const DynamicComponentToRender = dynamic(() => Promise.resolve(ComponentToRender));

    // Spread the content object to pass all properties as individual props
    return <DynamicComponentToRender {...content} />;
}