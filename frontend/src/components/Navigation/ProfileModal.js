

const ProfileModal = ({children}) => {
    return (
        <>
        <div className="modal_background"/>
        <div className="modal">
            {children}
        </div>
        </>
    )
}

export default ProfileModal
