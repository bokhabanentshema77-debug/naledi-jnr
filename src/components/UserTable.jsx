export default function UserTable({ users, currentUserId, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}{u.id === currentUserId && " (you)"}</td>
              <td>{u.memberId}</td>
              <td>{u.role}</td>
              <td className="actions">
                <button className="btn btn-sm btn-edit" onClick={() => onEdit(u)}>Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(u)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
