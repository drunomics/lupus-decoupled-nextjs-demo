import DynamicComponent from "../DynamicComponent";

export default function LayoutSection({ content }) {
    return (
      <div>
        <h2>{content.settings.label || 'Section'}</h2>
        {content.content.map((childElement, index) => (
          <DynamicComponent key={index} element={childElement.element} content={childElement} />
        ))}
      </div>
    );
  }