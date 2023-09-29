import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';

function UsersList(props) {
  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <Typography variant="h8">Amount: {props.usersData?.length}</Typography>
        <AddButton 
          handleClick={props.handleAdd}
        />
      </div>
      <div className={styles.usersListContent}>
        {props.usersData?.map((user, index) => (
          <UserRow key={index} user={user} onEdit={props.handleUserEdit}/>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
