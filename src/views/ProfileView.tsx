
const ProfileView = () : JSX.Element => {
  return (
    <div className="py-2 px-4 w-available">
      <div className="md:justify-items-start justify-items-center">
        <img
          src={`/img/empty_avatar.png`}
          alt="avatar"
          className="w-32"
        />
      </div>
    </div>
  )
}

export default ProfileView;