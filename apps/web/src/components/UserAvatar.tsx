const UserAvatar = ({ name }: { name: String }) => {
  const [firstName, lastName] = name.split(" ");

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-light p-3 border border-dark rounded-circle">
        <strong>
          {firstName.charAt(0)}
          {lastName ? lastName.charAt(0) : ""}
        </strong>
      </div>
    </div>
  );
};

export default UserAvatar;
