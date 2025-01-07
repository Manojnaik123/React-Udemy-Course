<h1>Refs and Portals</h1>
What to expect?<br/>
>Accessing DOM elements with Refs<br/>
>Managing Values with Refs<br/>
>Exposing API Functions from Components<br/>
>Detaching DOM Rendering from JSX Structure with Portals<br/>

<h1>Refs vs State values</h1>

Whenever a ref changeses the component function do not rerenders. <br/>
<h2>State</h2>
>Causes component re-evaluation when changed. <br/>
> Should be used for values that are directly reflected in the UI. <br/>
>Should not be used for "behind the scenes" values that have no direct UI impact.

<h2>Refs</h2>
>Do not cause component re-evaluation when changed. <br/>
>Can be used to gain direct DOM element access (great for reading values or accessing certain browser APIs)