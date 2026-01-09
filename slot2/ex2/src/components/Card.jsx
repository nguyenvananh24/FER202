// Component Card đơn giản 
function Card({ children, style }) {
    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Card;
