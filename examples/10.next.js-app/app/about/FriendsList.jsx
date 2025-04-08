export default function FriendsList({ friends }) {
  return (
    <>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </>
  );
}