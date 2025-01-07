import TabButton from "./TabButton.jsx";
import { useState } from "react";
import { EXAMPLES } from "../data.js";
import Tabs from "./Tabs.jsx";


export default function Examples() {

    const [selectedTopic, setSelectedTopic] = useState('');
    // this useState will return an array with excatly 2 elements
    // one element will be current data snapshot
    // other one will be a function to change that current data  

    function handleClick(selectedButton) {
        //useState(); WRONG WAY TO USE THIS HOOK
        setSelectedTopic(selectedButton);
        console.log(selectedTopic);
        // this log will output previsos value this is because Lec 54 9:30
        // when we call the setSelectedTopic function 
    }

    let tabContent = <p>Please select a topic</p>;

    if (selectedTopic) {
        tabContent = <div id='tab-content'>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
                <code>
                    {EXAMPLES[selectedTopic].code}
                </code>
            </pre>
        </div>;
    }

    return <>
        <section id='examples'>
        <h2>Examples</h2>
            <Tabs
            buttonsContainers="menu"
             buttons={<>
             <TabButton onSelect={() => handleClick('components')} isActive={selectedTopic === 'components'}>Components</TabButton>
                <TabButton onSelect={() => handleClick('jsx')} isActive={selectedTopic === 'jsx'}>JSX</TabButton>
                <TabButton onSelect={() => handleClick('props')} isActive={selectedTopic === 'props'}>Props</TabButton>
                <TabButton onSelect={() => handleClick('state')} isActive={selectedTopic === 'state'}>State</TabButton>
             </>}>
             {tabContent}
             </Tabs>
        </section>
    </>
}