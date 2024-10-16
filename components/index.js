import dynamic from "next/dynamic";

const components = {
    'node-article-full': dynamic(() => import('./NodeArticleFull')),
};

export default components;
