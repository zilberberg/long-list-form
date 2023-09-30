import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../../components/PrimaryButton';
import InputField from '../../../components/InputField';

const PAGE_AMOUNT = 10;

function UsersList({usersData, handleAdd, errors, handleUserEdit, onDelete}) {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ visableUsers, setVisableUsers ] = useState(usersData.slice(0, PAGE_AMOUNT));
  const [ searchValue, setSearchValue ] = useState("");
  const [ filteredResults, setFilteredResults ] = useState(visableUsers);

  useEffect(() => {
    setFilteredResults(visableUsers.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase())));
  }, [visableUsers, searchValue])

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
        <InputField
          name={"name"}
          value={searchValue}
          onChangehandler={(id, name, value) => setSearchValue(value)}
          placeholder={"Search user name"}
        />
      </div>
      <div className={styles.usersListContent}>
        {filteredResults?.map((user, index) => {
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
