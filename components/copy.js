const requireComponent = require.context('./custom-elements', true, /\.(jsx|tsx)$/);

const components = {};

function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

requireComponent.keys().forEach((fileName) => {
    const componentName = fileName
        .replace(/^\.\/(.*)\.(?:jsx|tsx)$/, '$1')
    
    const kebabCaseName = toKebabCase(componentName);
    
    components[kebabCaseName] = requireComponent(fileName).default;
});

export default components;