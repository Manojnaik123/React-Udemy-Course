export default function TabButton({onSelect, children, isActive}){
    return(
        <li><button className={isActive? 'active': undefined} onClick={onSelect}>{children}</button></li>
    );
}