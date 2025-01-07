import { CORE_CONCEPTS } from "../data";
import CoreConcepts from "./CoreConcepts.jsx";

export default function CoreConceptss() {
    return <>
        <section id='core-concepts'>
            <h2>Core Comcepts</h2>
            <ul>
                {CORE_CONCEPTS.map((conceptItem) => (
                    <CoreConcepts key={conceptItem.title} {...conceptItem} />
                ))}

            </ul>
        </section>
    </>
}