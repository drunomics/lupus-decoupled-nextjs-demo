import DynamicComponent from "./DynamicComponent";

export default function Node({ content }) {
    return (
      <div>
        {content.sections.map((section, index) => (
          <DynamicComponent key={index} element={section.element} content={section} />
        ))}
      </div>
    );
  }