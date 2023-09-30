import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../../components/PrimaryButton';

const PAGE_AMOUNT = 10;

function UsersList({usersData, handleAdd, errors, handleUserEdit, onDelete}) {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ visableUsers, setVisableUsers ] = useState(usersData.slice(0, 10));

  useEffect(() => {
    setVisableUsers(usersData.slice(currentIndex, currentIndex+PAGE_AMOUNT));
  }, [usersData, currentIndex])

  const handleNavClick = (isForward) => {
    setCurrentIndex(isForward ? (currentIndex + PAGE_AMOUNT) : (currentIndex - PAGE_AMOUNT));
  }

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <Typography variant="h8">Amount: {usersData?.length}</Typography>
        <AddButton 
          handleClick={handleAdd}
        />
      </div>
      <div className={styles.usersListContent}>
        {visableUsers?.map((user, index) => {
          const userErrors = errors.filter(error => error.id == user.id);
          return <UserRow key={index} user={user} onEdit={handleUserEdit} onDelete={onDelete} errors={userErrors}/>
        })}
      </div>
      <div className={styles.listNav}>
        <PrimaryButton handleClick={handleNavClick.bind(this, false)} disabled={currentIndex < PAGE_AMOUNT}>{"<"}</PrimaryButton>
        <PrimaryButton handleClick={handleNavClick.bind(this, true)} disabled={currentIndex > (usersData.length - PAGE_AMOUNT)}>{">"}</PrimaryButton>
      </div>
    </div>
  );
}

export default UsersList;
