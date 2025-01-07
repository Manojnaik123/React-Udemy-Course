export default function Tabs({ buttons, children, buttonsContainers }) {
    const ButtonsContainers = buttonsContainers; // adding this line will store buttonsContainers in new variable that starts with uppercase charecter
    return <>
        <ButtonsContainers>
            {buttons} 
        </ButtonsContainers>
        {children} 
    </>
}