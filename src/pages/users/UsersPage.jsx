import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useUsersContext } from '../../context/usersContext';
import { useEffect, useState } from 'react';
import { userInterface } from '../../data/userInterface';
import { v4 as uuidv4 } from 'uuid';

function UsersPage() {
  const { usersData, setUsersData } = useUsersContext();
  const [ updatedUsers, setUpdatedUsers ] = useState([]);
  const [ usersDataState, setUsersDataState ] = useState([]);
  const [ userErrors, setUserErrors ] = useState([]);

  useEffect(() => {
    setUsersDataState(usersData);
  }, [usersData])

  const handleAdd = () => {
    setUsersDataState([...usersDataState, {...userInterface, id: uuidv4()}])
  }

  const handleUserEdit = (id, name, value) => {
    let user = usersDataState.find(user => user.id == id);
    user[name] = value;
    setUpdatedUsers([...updatedUsers, user]);
    setUsersDataState([...usersDataState, user]);
  }

  const handleSave = () => {
    if (!validateData()) {
      setUsersData([...usersData, ...updatedUsers]);
    }
  }

  const validateData = () => {
    let errors = [];
    updatedUsers.forEach(updatedUser => {
      userInterface.forEach(dataKey => {
        if (!updatedUser[dataKey].length) {
          let error = {id: updatedUser.id};
          error[dataKey] = "Invalid";
          errors = [...errors, error];
        }
      })
    })
    setUserErrors(errors);
    return errors.length;
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList 
          usersData={[...usersDataState]}
          handleAdd={handleAdd}
          handleUserEdit={handleUserEdit}
          userErrors={userErrors}
        />
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={false}
            handleClick={handleSave}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
