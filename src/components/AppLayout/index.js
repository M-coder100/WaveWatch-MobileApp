import "./styles.css"
const AppLayout = ({ tanks, nav, scrollAnchor, carousel }) => {
    return (
        <>
            {nav}
            {scrollAnchor}
            {tanks}
            {carousel}
        </>
    )
}
export default AppLayout;